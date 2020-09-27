import WISHLIST_ACTION_TYPES from "./wishlist.action.types";

export const startWishlistsFetch = (userId) => ({
  type: WISHLIST_ACTION_TYPES.START_WISHLISTS_FETCH,
  payload: userId
});

export const wishlistsFetchFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.WISHLISTS_FETCH_FAIL,
  payload: errorMsg
});

export const wishlistsFetchSuccess = (wishlists) => ({
  type: WISHLIST_ACTION_TYPES.WISHLISTS_FETCH_SUCCESS,
  payload: wishlists
});

export const startWishlistFetchById = (wishlistId, userId) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_START,
  payload: { wishlistId, userId }
});

export const fetchWishlistByIdFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_FAIL,
  payload: errorMsg
});

export const fetchWishlistByIdSuccess = (wishlist) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_SUCCESS,
  payload: wishlist
});

export const addToWishlist = (item, wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST,
  payload: { item, wishlistId, loadingText: "Adding item to wishlist" }
});

export const removeFromWishlist = (item, wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.START_REMOVE_FROM_WISHLIST,
  payload: { item, wishlistId, loadingText: "Removing item from wishlist" }
});

export const updateWishlistFail = (errorTitle, errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAIL,
  payload: { errorTitle, errorMsg }
});

export const updateWishlistSuccess = (
  wishlists,
  notificationTitle,
  notificationMessage
) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS,
  payload: { wishlists, notificationTitle, notificationMessage }
});

export const deleteWishlistById = (wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.START_WISHLIST_DELETE_BY_ID,
  payload: { wishlistId, loadingText: "Deleting wishlist" }
});

export const deleteWishlistByIdFail = (errorTitle, errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_FAIL,
  payload: { errorTitle, errorMsg }
});

export const deleteWishlistByIdSuccess = (
  notificationTitle,
  notificationMessage
) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_SUCCESS,
  payload: { notificationTitle, notificationMessage }
});
