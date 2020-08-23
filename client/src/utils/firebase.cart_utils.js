import { firestore } from "./firebase.config";

const cartCollectionRef = firestore.collection("carts");

export const createNewCart = async (userRef) => {
  await cartCollectionRef.add({
    cartItems: [],
    isWishlist: false,
    userRef
  });
};

export const getUserCartSnapshot = async (userRef) => {
  const getUserCartQuery = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishlist", "==", false);
  const userCartSnapshot = await getUserCartQuery.get();
  return !userCartSnapshot.empty ? userCartSnapshot.docs[0] : null;
};

export const getUserCart = async (userRef) => {
  const cartSnapshot = await getUserCartSnapshot(userRef);
  const cart = cartSnapshot.data().cartItems;
  const populatedCart = await populateCart(cart);
  return { cart: populatedCart, cartId: cartSnapshot.id };
};

export const populateCart = async (cart) => {
  const populatedCart = [];
  for (let cartItemRef of cart) {
    let cartItemSnapshot = await cartItemRef.get();
    let { productRef, quantity } = cartItemSnapshot.data();
    let productSnapshot = await productRef.get();
    let product = productSnapshot.data();
    delete product.productCategoryRef;
    populatedCart.push({
      id: productSnapshot.id,
      cartItemId: cartItemSnapshot.id,
      ...product,
      quantity
    });
  }
  return populatedCart;
};

export const saveCartToDb = async (currentUser, cart) => {
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const { id: cartId } = await getUserCartSnapshot(userRef);
  const cartRef = firestore.doc(`carts/${cartId}`);
  const depopulatedCart = await depopulateCart(cart);
  await cartRef.update({ cartItems: depopulatedCart });
};

const depopulateCart = async (cart) => {
  const depopulateCart = [];
  for (let cartItem of cart) {
    let cartItemRef = firestore.doc(`cart_items/${cartItem.cartItemId}`);
    let productRef = firestore.doc(`products/${cartItem.id}`);
    let quantity = cartItem.quantity;
    await cartItemRef.update({ productRef, quantity });
    depopulateCart.push(cartItemRef);
  }
  return depopulateCart;
};
