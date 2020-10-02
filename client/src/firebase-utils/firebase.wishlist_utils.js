import { firestore } from "./firebase.config";
import {
  cartCollectionRef,
  populateCart,
  saveCart,
  createNewCart
} from "./firebase.cart_utils";
import { getUserRefById } from "./firebase.user_utils";

const getWishlistSnapshots = async (userId) => {
  const userRef = getUserRefById(userId);
  const getUserWishlists = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishlist", "==", true);
  const wishlistsSnapshot = await getUserWishlists.get();
  return wishlistsSnapshot.docs;
};

export const getUserWishlists = async (userId) => {
  const wishlists = {};
  const wishlistSnapshots = await getWishlistSnapshots(userId);
  for (let wishlistSnapshot of wishlistSnapshots) {
    let wishlistWithRefs = wishlistSnapshot.data().cartItems;
    let wishlistWithoutRefs = await populateCart(wishlistWithRefs);
    wishlists[wishlistSnapshot.id] = {
      items: wishlistWithoutRefs
    };
  }
  return wishlists;
};

export const getWishlistRefById = (wishlistId) => {
  const wishlistRef = firestore.doc(`carts/${wishlistId}`);
  return wishlistRef;
};

export const getWishlistById = async (wishlistId) => {
  try {
    const wishlistRef = getWishlistRefById(wishlistId);
    const wishlistSnapshot = await wishlistRef.get();
    const { cartItems } = wishlistSnapshot.data();
    let wishlistWithoutRefs = await populateCart(cartItems);
    return { items: wishlistWithoutRefs };
  } catch (err) {
    return null;
  }
};

export const deleteWishlistById = async (wishlistId) => {
  const wishlistRef = getWishlistRefById(wishlistId);
  await wishlistRef.delete();
};

export const saveWishlists = async (wishlists) => {
  for (let wishlist of wishlists) {
    let wishlistItems = wishlist.items;
    let wishlistId = wishlist.id;
    await saveCart(wishlistItems, wishlistId);
  }
};

export const createNewWishlist = async (userId, wishlistName) => {
  const userRef = getUserRefById(userId);
  const newWishlistRef = await createNewCart(userRef, true, {
    name: wishlistName
  });
  return { wishlistId: newWishlistRef.id, items: [] };
};
