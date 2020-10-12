import { firestore } from "./firebase.config";
import {
  updateProductStock,
  getProductDataAndRefById
} from "./firebase.product_utils";
import { truncate } from "../global.utils";

export const cartCollectionRef = firestore.collection("carts");
export const cartItemCollectionRef = firestore.collection("cart_items");

export const createNewCart = async (userRef, isWishList = false, extraInfo) => {
  const cartRef = await cartCollectionRef.add({
    cartItems: [],
    isWishList,
    userRef,
    ...extraInfo
  });
  return cartRef;
};

export const clearUserCart = async (cartId) => {
  const cartRef = firestore.doc(`carts/${cartId}`);
  await cartRef.update({ cartItems: [] });
};

export const createNewCartItemDoc = async (productId) => {
  const productRef = firestore.doc(`products/${productId}`);
  const newCartItemRef = cartItemCollectionRef.add({ productRef, quantity: 1 });
  return newCartItemRef;
};

export const deleteCartItemDoc = async (cartItemId) => {
  const cartItemRef = firestore.doc(`cart_items/${cartItemId}`);
  await cartItemRef.delete();
};

export const deleteAllCartItemDocsInCart = async (shoppingCart) => {
  for (let cartItem of shoppingCart) {
    await deleteCartItemDoc(cartItem.cartItemId);
  }
};

export const checkCartItemsInStockOrOutdated = async (shoppingCart) => {
  for (let cartItem of shoppingCart) {
    const { productData } = await getProductDataAndRefById(cartItem.productId);
    if (!productData) {
      throw Error(
        `${truncate(
          cartItem.name
        )} is no longer sold. Please remove the item from cart before trying again`
      );
    } else if (cartItem.quantity > productData.stock) {
      throw Error(
        `There are only ${productData.stock} ${truncate(
          cartItem.name
        )} in stock. Please reduce the item's quantity and try again`
      );
    }
  }
};

export const updateProductStocksInCart = async (shoppingCart) => {
  for (let cartItem of shoppingCart) {
    await updateProductStock(cartItem.productId, cartItem.quantity);
  }
};

const getUserCartSnapshot = async (userRef) => {
  const getUserCartAndCartIdQuery = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishList", "==", false);
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
  } catch (err) {
    const newCartRef = await createNewCart(userRef);
    return { cart: [], cartId: newCartRef.id };
  }
};

export const updateCart = async (cartId, updatedCartInfo) => {
  const cartRef = firestore.doc(`carts/${cartId}`);
  await cartRef.update(updatedCartInfo);
};

export const saveCartItems = async (cartWithoutCartItemRefs, cartId) => {
  const cartWithCartItemRefs = await replaceCartWithCartItemRefs(
    cartWithoutCartItemRefs
  );
  await updateCart(cartId, { cartItems: cartWithCartItemRefs });
};

export const populateCartItemFromRef = async (cartItemRef) => {
  try {
    let cartItemSnapshot = await cartItemRef.get();
    let { productRef, quantity } = cartItemSnapshot.data();
    let { productData } = await getProductDataAndRefById(productRef.id);
    return {
      productId: productRef.id,
      cartItemId: cartItemSnapshot.id,
      ...productData,
      quantity
    };
  } catch (err) {
    await cartItemRef.delete();
    return null;
  }
};

export const populateCart = async (cartWithCartItemRefs) => {
  const populatedCart = [];
  try {
    for (let cartItemRef of cartWithCartItemRefs) {
      let cartItem = await populateCartItemFromRef(cartItemRef);
      if (cartItem) {
        populatedCart.push(cartItem);
      }
    }
  } catch (err) {}
  return populatedCart;
};

export const replaceCartWithCartItemRefs = async (cartWithoutCartItemRefs) => {
  const cartWithCartItemRefs = [];
  const batch = firestore.batch();
  for (let cartItem of cartWithoutCartItemRefs) {
    let cartItemRef = firestore.doc(`cart_items/${cartItem.cartItemId}`);
    console.log(cartItem);
    batch.update(cartItemRef, { quantity: cartItem.quantity || 1 });
    cartWithCartItemRefs.push(cartItemRef);
  }
  await batch.commit();
  return cartWithCartItemRefs;
};
