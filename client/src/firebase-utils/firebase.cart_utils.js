import { firestore } from "./firebase.config";
import { updateProductStock, getProductById } from "./firebase.product_utils";
import { truncate } from "../global.utils";
import {
  createNewDoc,
  deleteDocById,
  deleteDocByRef,
  executeQuery,
  FIRESTORE_COLLECTION_REFS,
  getDocDataByRef,
  getDocRefById,
  updateDocDataById,
  PRODUCT_COLLECTION_NAME,
  CART_ITEM_COLLECTION_NAME,
  CART_COLLECTION_NAME,
  USER_COLLECTION_NAME
} from "./firebase.abstract_utils";

export const createNewCartItem = async (productId) => {
  const productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
  const newCartItemRef = await createNewDoc(
    FIRESTORE_COLLECTION_REFS.cartItemCollectionRef,
    {
      productRef,
      quantity: 1
    }
  );
  return newCartItemRef;
};

export const deleteAllCartItemInArr = async (arrOfCartItems) => {
  for (let cartItem of arrOfCartItems) {
    let { cartItemId } = cartItem;
    await deleteDocById(CART_ITEM_COLLECTION_NAME, cartItemId);
  }
};

export const checkCartItemsInStockOrOutdated = async (cart) => {
  for (let cartItem of cart) {
    let { productId, name, price, quantity } = cartItem;
    let product = await getProductById(productId);
    if (!product) {
      throw Error(
        `${truncate(
          name
        )} is no longer sold. Please remove the item from the cart and try again.`
      );
    } else if (price !== product.price) {
      throw Error(
        `There was a problem. Please remove the item from the cart and add it again.`
      );
    } else if (quantity > product.stock) {
      throw Error(
        `There are only ${product.stock} ${truncate(
          name
        )} in stock. Please reduce the item's quantity and try again.`
      );
    }
  }
};

export const updateProductStocksInCart = async (cart) => {
  for (let cartItem of cart) {
    let { productId, quantity } = cartItem;
    await updateProductStock(productId, quantity);
  }
};

const getUserCartSnapshotFromRef = async (userRef) => {
  const userCartQuery = FIRESTORE_COLLECTION_REFS.cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishList", "==", false);
  const cartSnapshots = await executeQuery(userCartQuery);
  return cartSnapshots[0];
};

export const getUserCartWithId = async (userId) => {
  const userRef = getDocRefById(USER_COLLECTION_NAME, userId);
  try {
    const cartSnapshot = await getUserCartSnapshotFromRef(userRef);
    const cartWithCartItemRefs = cartSnapshot.data().cartItems;
    const populatedCart = await populateCart(cartWithCartItemRefs);
    return { cart: populatedCart, cartId: cartSnapshot.id };
  } catch (err) {
    const newCartRef = await createNewDoc(
      FIRESTORE_COLLECTION_REFS.cartCollectionRef,
      { userRef, cartItems: [], isWishList: false }
    );
    return { cart: [], cartId: newCartRef.id };
  }
};

export const saveCart = async (populatedCart, cartId) => {
  const cartWithCartItemRefs = await replaceWithCartItemRefs(populatedCart);
  await updateDocDataById(CART_COLLECTION_NAME, cartId, {
    cartItems: cartWithCartItemRefs
  });
};

export const populateCartItemFromRef = async (cartItemRef) => {
  try {
    let cartItem = await getDocDataByRef(cartItemRef, true, "cartItemId");
    let { productRef, quantity, cartItemId } = cartItem;
    let productId = productRef.id;
    let product = await getProductById(productId);
    return {
      ...product,
      productId,
      cartItemId,
      quantity
    };
  } catch (err) {
    await deleteDocByRef(cartItemRef);
    return null;
  }
};

export const populateCart = async (cartWithCartItemRefs) => {
  try {
    const populatedCart = [];
    for (let cartItemRef of cartWithCartItemRefs) {
      let cartItem = await populateCartItemFromRef(cartItemRef);
      if (cartItem) {
        populatedCart.push(cartItem);
      }
    }
    return populatedCart;
  } catch (err) {
    return [];
  }
};

export const replaceWithCartItemRefs = async (populatedCart) => {
  try {
    const cartWithCartItemRefs = [];
    const batch = firestore.batch();
    for (let cartItem of populatedCart) {
      let { cartItemId, quantity } = cartItem;
      let cartItemRef = getDocRefById(CART_ITEM_COLLECTION_NAME, cartItemId);
      batch.update(cartItemRef, { quantity: quantity || 1 });
      cartWithCartItemRefs.push(cartItemRef);
    }
    await batch.commit();
    return cartWithCartItemRefs;
  } catch (err) {
    return [];
  }
};
