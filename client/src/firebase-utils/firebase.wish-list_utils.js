import { firestore } from "./firebase.config";
import {
  cartCollectionRef,
  populateCart,
  createNewCart,
  deleteAllCartItemDocsInCart
} from "./firebase.cart_utils";
import { getUserRefById } from "./firebase.user_utils";
import { capitalize } from "../global.utils";

const getWishListSnapshots = async (userId) => {
  const userRef = getUserRefById(userId);
  const userWishListQuery = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishList", "==", true);
  const wishListsSnapshot = await userWishListQuery.get();
  return wishListsSnapshot.docs;
};

const extraWishListDataFromSnapshot = async (wishListSnapshot) => {
  let {
    cartItems: wishListItemsWithRefs,
    wishListName,
    createdAt
  } = wishListSnapshot.data();
  let wishListItemsWithoutRefs = await populateCart(wishListItemsWithRefs);
  return {
    wishListId: wishListSnapshot.id,
    items: wishListItemsWithoutRefs,
    wishListName,
    createdAt: createdAt.toDate()
  };
};

export const getWishLists = async (userId) => {
  const wishLists = [];
  const wishListSnapshots = await getWishListSnapshots(userId);
  for (let wishListSnapshot of wishListSnapshots) {
    let wishListData = await extraWishListDataFromSnapshot(wishListSnapshot);
    wishLists.push(wishListData);
  }
  return wishLists;
};

export const getWishListRefById = (wishListId) => {
  const wishListRef = firestore.doc(`carts/${wishListId}`);
  return wishListRef;
};

export const getWishListById = async (wishListId) => {
  try {
    const wishListRef = getWishListRefById(wishListId);
    const wishListSnapshot = await wishListRef.get();
    const wishListData = await extraWishListDataFromSnapshot(wishListSnapshot);
    return wishListData;
  } catch (err) {
    return null;
  }
};

export const deleteWishListById = async (wishListToDelete) => {
  await deleteAllCartItemDocsInCart(wishListToDelete.items);
  const wishListRef = getWishListRefById(wishListToDelete.wishListId);
  await wishListRef.delete();
};

export const createNewWishList = async (userId, newWishListInfo) => {
  const userRef = getUserRefById(userId);
  const createdAt = new Date();
  const wishListName = capitalize(newWishListInfo.wishListName);
  const newWishListRef = await createNewCart(userRef, true, {
    ...newWishListInfo,
    wishListName,
    createdAt
  });
  return {
    ...newWishListInfo,
    wishListId: newWishListRef.id,
    items: [],
    createdAt,
    wishListName
  };
};
