import { firestore } from "./firebase.config";
import { setProductStock, getProductById } from "./firebase.product_utils";
import { truncate } from "../redux/cart/cart.sagas";

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

export const clearUserCart = async (cartId) => {
  const cartRef = firestore.doc(`carts/${cartId}`);
  await cartRef.update({ cartItems: [] });
};

export const createNewCartItemDoc = async (productId) => {
  const newCartItemRef = cartItemCollectionRef.doc();
  const productRef = firestore.doc(`products/${productId}`);
  await newCartItemRef.set({ productRef, quantity: 1 });
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
    const { productData } = await getProductById(cartItem.productId);
    if (!productData) {
      throw Error(
        `${truncate(
          cartItem.name
        )} is no longer sold. Please remove the item from cart completely and try again`
      );
    } else if (cartItem.quantity > productData.stock) {
      throw Error(
        `There are only ${productData.stock} ${truncate(
          cartItem.name
        )} in stock. Please update the item's quantity and try again`
      );
    }
  }
};

export const updateProductStocksInCart = async (shoppingCart) => {
  for (let cartItem of shoppingCart) {
    await setProductStock(cartItem.productId, cartItem.quantity);
  }
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
  } catch (err) {
    const newCartRef = await createNewCart(userRef);
    return { cart: [], cartId: newCartRef.id };
  }
};

export const saveCart = async (cartWithoutCartItemRefs, cartId) => {
  const cartRef = firestore.doc(`carts/${cartId}`);
  const cartWithCartItemRefs = await replaceCartWithCartItemRefs(
    cartWithoutCartItemRefs
  );
  await cartRef.update({ cartItems: cartWithCartItemRefs });
};

const getCartItemFromCartItemRef = async (cartItemRef) => {
  try {
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
  } catch (err) {
    await cartItemRef.delete();
    return null;
  }
};

const populateCart = async (cartWithCartItemRefs) => {
  const populatedCart = [];
  try {
    for (let cartItemRef of cartWithCartItemRefs) {
      let cartItem = await getCartItemFromCartItemRef(cartItemRef);
      if (cartItem) {
        populatedCart.push(cartItem);
      }
    }
  } catch (err) {}
  return populatedCart;
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
