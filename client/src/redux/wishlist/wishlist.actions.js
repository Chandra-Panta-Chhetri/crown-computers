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

export const startWishlistFetchById = (wishlistId, onFail = () => {}) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_START,
  payload: { wishlistId, onFail }
});

export const fetchWishlistByIdFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_FAIL,
  payload: errorMsg
});

export const fetchWishlistByIdSuccess = (wishlist) => ({
  type: WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_SUCCESS,
  payload: wishlist
});

export const deleteWishlistById = (wishlistId, wishlistName) => ({
  type: WISHLIST_ACTION_TYPES.START_WISHLIST_DELETE_BY_ID,
  payload: {
    wishlistId,
    wishlistName,
    loadingText: `Deleting ${wishlistName} wishlist`
  }
});

export const deleteWishlistByIdFail = (errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_FAIL,
  payload: errorMsg
});

export const deleteWishlistByIdSuccess = (notificationMsg, wishlists) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_SUCCESS,
  payload: { notificationMsg, wishlists }
});

export const createNewWishlist = (newWishlistInfo, onSuccess) => ({
  type: WISHLIST_ACTION_TYPES.CREATE_NEW_WISHLIST,
  payload: {
    newWishlistInfo,
    onSuccess,
    loadingText: `Creating ${newWishlistInfo.wishlistName} wishlist`
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

export const addToWishlist = (item, wishlist, wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST,
  payload: {
    item,
    wishlist,
    wishlistId,
    loadingText: `Adding item to ${wishlist.wishlistName}`
  }
});

export const removeFromWishlist = (item, wishlist, wishlistId) => ({
  type: WISHLIST_ACTION_TYPES.START_REMOVE_FROM_WISHLIST,
  payload: {
    item,
    wishlist,
    wishlistId,
    loadingText: `Removing item from ${wishlist.wishlistName}`
  }
});

export const updateWishlistFail = (errorTitle, errorMsg) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAIL,
  payload: { errorTitle, errorMsg }
});

export const updateWishlistSuccess = (
  notificationTitle,
  notificationMsg,
  updatedWishlist,
  wishlistId
) => ({
  type: WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS,
  payload: { notificationTitle, notificationMsg, updatedWishlist, wishlistId }
});
