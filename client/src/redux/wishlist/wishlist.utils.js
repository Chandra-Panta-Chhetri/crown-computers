import {
  createNewCartItemDoc,
  deleteCartItemDoc
} from "../../firebase-utils/firebase.cart_utils";
import { truncate } from "../cart/cart.sagas";

export const addItemToWishlist = async (wishlist, item) => {
  const isItemInWishlist = wishlist.items.some(
    (wishlistItem) => wishlistItem.productId === item.productId
  );
  if (isItemInWishlist) {
    throw Error(
      `${truncate(item.name)} is already in ${wishlist.wishlistName}`
    );
  }
  const { id: newCartItemId } = await createNewCartItemDoc(item.productId);
  wishlist.items.push({
    ...item,
    cartItemId: newCartItemId
  });
  return { ...wishlist };
};

export const removeItemFromWishlist = async (wishlist, item) => {
  const isItemInWishlist = wishlist.items.some(
    (wishlistItem) => wishlistItem.productId === item.productId
  );
  if (!isItemInWishlist) {
    throw Error(
      `${truncate(item.name)} does not exist in ${wishlist.wishlistName}`
    );
  }
  await deleteCartItemDoc(item.cartItemId);
  wishlist.items = wishlist.items.filter(
    (wishlistItem) => wishlistItem.productId !== item.productId
  );

  return { ...wishlist };
};

export const removeWishlist = (wishlists, wishlistId) => {
  if (!wishlists[wishlistId]) {
    throw Error(`Wishlist with id ${wishlistId} does not exist`);
  }
  delete wishlists[wishlistId];
  return { ...wishlists };
};
