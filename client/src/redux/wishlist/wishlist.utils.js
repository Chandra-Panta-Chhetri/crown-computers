import {
  createNewCartItemDoc,
  deleteCartItemDoc
} from "../../firebase-utils/firebase.cart_utils";

export const addItemToWishlist = async (wishlists, wishlistId, item) => {
  const wishlistToUpdate = wishlists[wishlistId];
  const isItemInWishlist = wishlistToUpdate.items.some(
    (wishlistItem) => wishlistItem.productId === item.productId
  );
  if (!isItemInWishlist) {
    const { id: newCartItemId } = await createNewCartItemDoc(item.productId);
    wishlistToUpdate.items.push({
      ...item,
      cartItemId: newCartItemId
    });
    return { ...wishlists };
  }
  return wishlists;
};

export const removeItemFromWishlist = async (wishlists, wishlistId, item) => {
  const wishlistToUpdate = wishlists[wishlistId];
  const isItemInWishlist = wishlistToUpdate.items.some(
    (wishlistItem) => wishlistItem.productId === item.productId
  );
  if (isItemInWishlist) {
    await deleteCartItemDoc(item.cartItemId);
    wishlistToUpdate.items = wishlistToUpdate.items.filter(
      (wishlistItem) => wishlistItem.productId !== item.productId
    );

    return { ...wishlists };
  }
  return wishlists;
};
