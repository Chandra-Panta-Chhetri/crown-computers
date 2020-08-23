import { firestore } from "../../utils/firebase.config";
const cartItemColRef = firestore.collection("cart_items");

export const addToCart = async (shoppingCart, item, isLoggedIn) => {
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (itemIndex === -1) {
    if (isLoggedIn) {
      const cartItemRef = cartItemColRef.doc();
      const productRef = firestore.doc(`products/${item.id}`);
      await cartItemRef.set({ productRef, quantity: 1 });
      return [
        ...shoppingCart,
        { ...item, quantity: 1, cartItemId: cartItemRef.id }
      ];
    }
    return [...shoppingCart, { ...item, quantity: 1 }];
  }
  const prevQuantity = shoppingCart[itemIndex].quantity;
  shoppingCart[itemIndex] = {
    ...shoppingCart[itemIndex],
    quantity: prevQuantity + 1
  };
  return [...shoppingCart];
};

export const removeFromCart = async (shoppingCart, item, isLoggedIn) => {
  if (isLoggedIn) {
    const cartItemRef = firestore.doc(`cart_items/${item.cartItemId}`);
    await cartItemRef.delete();
    console.log("success");
  }
  return shoppingCart.filter((cartItem) => cartItem.id !== item.id);
};

export const changeItemQuantity = async (
  shoppingCart,
  { item, newQuantity },
  isLoggedIn
) => {
  if (newQuantity <= 0) {
    const updatedCart = await removeFromCart(shoppingCart, item, isLoggedIn);
    return updatedCart;
  }
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (itemIndex !== -1) {
    shoppingCart[itemIndex] = {
      ...shoppingCart[itemIndex],
      quantity: newQuantity
    };
  }
  return [...shoppingCart];
};
