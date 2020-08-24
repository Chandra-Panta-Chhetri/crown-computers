import {
  createNewCartItem,
  removeCartItem
} from "../../utils/firebase.cart_utils";

export const addToCart = async (shoppingCart, item, isLoggedIn) => {
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.productId === item.productId
  );

  if (itemIndex === -1) {
    if (!isLoggedIn) {
      return [...shoppingCart, { ...item, quantity: 1 }];
    }
    const { id: newCartItemId } = await createNewCartItem(item.productId);
    return [
      ...shoppingCart,
      { ...item, quantity: 1, cartItemId: newCartItemId }
    ];
  }
  const newQuantity = shoppingCart[itemIndex].quantity + 1;
  shoppingCart[itemIndex] = {
    ...shoppingCart[itemIndex],
    quantity: newQuantity
  };
  return [...shoppingCart];
};

export const removeFromCart = async (shoppingCart, item, isLoggedIn) => {
  if (isLoggedIn) {
    await removeCartItem(item.cartItemId);
  }
  return shoppingCart.filter(
    (cartItem) => cartItem.productId !== item.productId
  );
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
    (cartItem) => cartItem.productId === item.productId
  );
  if (itemIndex !== -1) {
    shoppingCart[itemIndex] = {
      ...shoppingCart[itemIndex],
      quantity: newQuantity
    };
  }
  return [...shoppingCart];
};
