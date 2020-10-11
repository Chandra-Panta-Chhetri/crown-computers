import {
  createNewCartItemDoc,
  deleteCartItemDoc
} from "../../firebase-utils/firebase.cart_utils";
import { truncate } from "../../global.utils.js";

export const addItemToWishList = async (wishList, item) => {
  const isItemInWishList = wishList.items.some(
    (wishListItem) => wishListItem.productId === item.productId
  );
  if (isItemInWishList) {
    throw Error(
      `${truncate(item.name)} is already in ${wishList.wishListName}`
    );
  }
  const { id: newCartItemId } = await createNewCartItemDoc(item.productId);
  wishList.items.push({
    ...item,
    cartItemId: newCartItemId
  });
  return { ...wishList };
};

export const removeItemFromWishList = async (wishList, item) => {
  const isItemInWishList = wishList.items.some(
    (wishListItem) => wishListItem.productId === item.productId
  );
  if (!isItemInWishList) {
    throw Error(
      `${truncate(item.name)} does not exist in ${wishList.wishListName}`
    );
  }
  await deleteCartItemDoc(item.cartItemId);
  wishList.items = wishList.items.filter(
    (wishListItem) => wishListItem.productId !== item.productId
  );

  return { ...wishList };
};

export const removeWishList = (wishLists, wishListId) => {
  const indexOfWishListToDelete = wishLists.findIndex(
    (wishList) => wishList.wishListId === wishListId
  );
  if (indexOfWishListToDelete === -1) {
    throw Error(`Wish list with id ${wishListId} does not exist`);
  }
  wishLists.splice(indexOfWishListToDelete, 1);
  return [...wishLists];
};
