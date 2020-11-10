import { createNewCartItem } from "../../firebase-utils/firebase.cart_utils";
import { truncate } from "../../global.utils.js";

export const addItemToWishList = async (wishList, item) => {
  const isItemInWishList = wishList.items.some(
    (wishListItem) => wishListItem.productId === item.productId
  );
  if (isItemInWishList) {
    throw Error(
      `${truncate(item.name)} is already in ${wishList.wishListName}.`
    );
  }
  const { id: newCartItemId } = await createNewCartItem(item.productId);
  wishList.items.push({
    ...item,
    cartItemId: newCartItemId
  });
  return { ...wishList };
};
