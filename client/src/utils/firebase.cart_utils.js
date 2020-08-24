import { firestore } from "./firebase.config";

const cartCollectionRef = firestore.collection("carts");
const cartItemCollectionRef = firestore.collection("cart_items");

export const createNewCart = async (userRef) => {
  const cartRef = await cartCollectionRef.add({
    cartItems: [],
    isWishlist: false,
    userRef
  });
  return cartRef;
};

export const createNewCartItem = async (productId) => {
  const newCartItemRef = cartItemCollectionRef.doc();
  const productRef = firestore.doc(`products/${productId}`);
  await newCartItemRef.set({ productRef, quantity: 1 });
  return newCartItemRef;
};

export const removeCartItem = async (cartItemId) => {
  const cartItemRef = firestore.doc(`cart_items/${cartItemId}`);
  await cartItemRef.delete();
};

const getUserCartSnapshot = async (userRef) => {
  const getUserCartAndCartIdQuery = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishlist", "==", false);
  const userCartQuerySnapshot = await getUserCartAndCartIdQuery.get();
  const userCartSnapshot = userCartQuerySnapshot.docs[0];
  return userCartSnapshot;
};

export const getUserCartAndCartId = async (userRef) => {
  try {
    const cartSnapshot = await getUserCartSnapshot(userRef);
    const cartWithCartItemRefs = cartSnapshot.data().cartItems;
    const cartWithoutCartItemRefs = await populateCart(cartWithCartItemRefs);
    return { cart: cartWithoutCartItemRefs, cartId: cartSnapshot.id };
  } catch (e) {
    const newCartRef = await createNewCart(userRef);
    return { cart: [], cartId: newCartRef.id };
  }
};

export const saveCartToDb = async (cartWithoutCartItemRefs, cartId) => {
  const cartRef = firestore.doc(`carts/${cartId}`);
  const cartWithCartItemRefs = await replaceCartWithCartItemRefs(
    cartWithoutCartItemRefs
  );
  await cartRef.update({ cartItems: cartWithCartItemRefs });
};

const getCartItemFromCartItemRef = async (cartItemRef) => {
  let cartItemSnapshot = await cartItemRef.get();
  let { productRef, quantity } = cartItemSnapshot.data();
  let productSnapshot = await productRef.get();
  let product = productSnapshot.data();
  delete product.productCategoryRef;
  return {
    productId: productSnapshot.id,
    cartItemId: cartItemSnapshot.id,
    ...product,
    quantity
  };
};

const populateCart = async (cartWithCartItemRefs) => {
  try {
    const populatedCart = [];
    for (let cartItemRef of cartWithCartItemRefs) {
      let cartItem = await getCartItemFromCartItemRef(cartItemRef);
      populatedCart.push(cartItem);
    }
    return populatedCart;
  } catch (e) {
    return [];
  }
};

const replaceCartWithCartItemRefs = async (cartWithoutCartItemRefs) => {
  const cartWithCartItemRefs = [];
  const batch = firestore.batch();
  for (let cartItem of cartWithoutCartItemRefs) {
    let cartItemRef = firestore.doc(`cart_items/${cartItem.cartItemId}`);
    batch.update(cartItemRef, { quantity: cartItem.quantity });
    cartWithCartItemRefs.push(cartItemRef);
  }
  await batch.commit();
  return cartWithCartItemRefs;
};
