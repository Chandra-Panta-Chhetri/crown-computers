import { populateCart, deleteAllCartItemInArr } from "./firebase.cart_utils";
import { capitalize } from "../global.utils";
import {
  createNewDoc,
  deleteDocById,
  executeQuery,
  FIRESTORE_COLLECTION_REFS,
  getDocDataFromSnapshot,
  getDocRefById,
  getDocSnapshotById,
  USER_COLLECTION_NAME,
  CART_COLLECTION_NAME
} from "./firebase.abstract_utils";

const getWishListFromSnapshot = async (wishListSnapshot) => {
  let wishListData = getDocDataFromSnapshot(
    wishListSnapshot,
    true,
    "wishListId"
  );
  let wishListItems = await populateCart(wishListData.cartItems);
  let wishList = {
    wishListName: wishListData.wishListName,
    createdAt: wishListData.createdAt.toDate(),
    wishListId: wishListData.wishListId,
    items: wishListItems
  };
  return wishList;
};

export const getWishLists = async (userId) => {
  const userRef = getDocRefById(USER_COLLECTION_NAME, userId);
  const userWishListsQuery = FIRESTORE_COLLECTION_REFS.cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishList", "==", true);
  const wishListSnapshots = await executeQuery(userWishListsQuery);
  const wishLists = [];
  for (let wishListSnapshot of wishListSnapshots) {
    let wishList = await getWishListFromSnapshot(wishListSnapshot);
    wishLists.push(wishList);
  }
  return wishLists;
};

export const getWishListById = async (wishListId) => {
  try {
    const wishListSnapshot = await getDocSnapshotById(
      CART_COLLECTION_NAME,
      wishListId
    );
    const wishList = await getWishListFromSnapshot(wishListSnapshot);
    return wishList;
  } catch (err) {
    return null;
  }
};

export const deleteWishListById = async (wishListToDelete) => {
  const { items, wishListId } = wishListToDelete;
  await deleteAllCartItemInArr(items);
  await deleteDocById(CART_COLLECTION_NAME, wishListId);
};

export const createNewWishList = async (userId, newWishListInfo) => {
  const { wishListName } = newWishListInfo;
  const createdAt = new Date();
  const capitalizedWishListName = capitalize(wishListName);
  const newWishList = {
    ...newWishListInfo,
    userRef: getDocRefById(USER_COLLECTION_NAME, userId),
    cartItems: [],
    isWishList: true,
    wishListName: capitalizedWishListName,
    createdAt
  };
  const newWishListRef = await createNewDoc(
    FIRESTORE_COLLECTION_REFS.cartCollectionRef,
    newWishList
  );
  const formattedWishList = {
    ...newWishListInfo,
    wishListId: newWishListRef.id,
    items: [],
    createdAt,
    wishListName: capitalizedWishListName
  };
  return formattedWishList;
};
