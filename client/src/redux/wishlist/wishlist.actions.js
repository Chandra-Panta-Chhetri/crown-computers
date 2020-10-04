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

export const startWishlistFetchById = (wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_START,
  payload: wishlistId
});

export const fetchWishlistByIdFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_FAIL,
  payload: errorMsg
});

export const fetchWishlistByIdSuccess = (wishlist) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_SUCCESS,
  payload: wishlist
});

export const deleteWishlistById = (wishlistId, wishlistName, onSuccess) => ({
  type: WISHLIST_ACTION_TYPES.START_WISHLIST_DELETE_BY_ID,
  payload: {
    wishlistId,
    wishlistName,
    onSuccess,
    loadingText: `Deleting ${wishlistName} wishlist`
  }
});

export const deleteWishlistByIdFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_FAIL,
  payload: errorMsg
});

export const deleteWishlistByIdSuccess = (notificationMsg) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_SUCCESS,
  payload: notificationMsg
});

export const createNewWishlist = (newWishlistInfo, onSuccess) => ({
  type: WISHLIST_ACTION_TYPES.CREATE_NEW_WISHLIST,
  payload: {
    newWishlistInfo,
    onSuccess,
    loadingText: `Creating ${newWishlistInfo.name} wishlist`
  }
});

export const createWishlistFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.CREATE_WISHLIST_FAIL,
  payload: errorMsg
});

export const createWishlistSuccess = (wishlistName, wishlists) => ({
  type: WISHLIST_ACTION_TYPES.CREATE_WISHLIST_SUCCESS,
  payload: { wishlistName, wishlists }
});

export const addToWishlist = (item, wishlistId, wishlistName) => ({
  type: WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST,
  payload: {
    item,
    wishlistId,
    wishlistName,
    loadingText: `Adding item to ${wishlistName}`
  }
});

export const removeFromWishlist = (item, wishlistId, wishlistName) => ({
  type: WISHLIST_ACTION_TYPES.START_REMOVE_FROM_WISHLIST,
  payload: {
    item,
    wishlistId,
    wishlistName,
    loadingText: `Removing item from ${wishlistName}`
  }
});

export const updateWishlistFail = (errorTitle, errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAIL,
  payload: { errorTitle, errorMsg }
});

export const updateWishlistSuccess = (
  wishlists,
  notificationTitle,
  notificationMsg
) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS,
  payload: { wishlists, notificationTitle, notificationMsg }
});
