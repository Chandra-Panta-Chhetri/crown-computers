import WISH_LIST_ACTION_TYPES from "./wish-list.action.types";

export const startWishListsFetch = () => ({
  type: WISH_LIST_ACTION_TYPES.START_WISH_LISTS_FETCH
});

export const wishListsFetchFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_FAIL,
  payload: errorMsg
});

export const wishListsFetchSuccess = (wishLists) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_SUCCESS,
  payload: wishLists
});

export const startWishListFetchById = (wishListId, onFail = () => {}) => ({
  type: WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_START,
  payload: { wishListId, onFail }
});

export const fetchWishListByIdFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_FAIL,
  payload: errorMsg
});

export const fetchWishListByIdSuccess = (wishList) => ({
  type: WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_SUCCESS,
  payload: wishList
});

export const deleteWishListById = (wishListToDelete) => ({
  type: WISH_LIST_ACTION_TYPES.START_WISH_LIST_DELETE_BY_ID,
  payload: {
    wishListToDelete,
    loadingText: `Deleting ${wishListToDelete.wishListName}`
  }
});

export const deleteWishListByIdFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_FAIL,
  payload: errorMsg
});

export const deleteWishListByIdSuccess = (notificationMsg, wishLists) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_SUCCESS,
  payload: { notificationMsg, wishLists }
});

export const createNewWishList = (newWishListInfo, onSuccess) => ({
  type: WISH_LIST_ACTION_TYPES.CREATE_NEW_WISH_LIST,
  payload: {
    newWishListInfo,
    onSuccess,
    loadingText: `Creating ${newWishListInfo.wishListName}`
  }
});

export const createWishListFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_FAIL,
  payload: errorMsg
});

export const createWishListSuccess = (createdWishList) => ({
  type: WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_SUCCESS,
  payload: createdWishList
});

export const addToWishList = (item, wishList) => ({
  type: WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST,
  payload: {
    item,
    wishList,
    loadingText: `Adding item to ${wishList.wishListName}`
  }
});

export const removeFromWishList = (item, wishList) => ({
  type: WISH_LIST_ACTION_TYPES.START_REMOVE_FROM_WISH_LIST,
  payload: {
    item,
    wishList,
    loadingText: `Removing item from ${wishList.wishListName}`
  }
});

export const startWishListUpdate = (
  updatedWishList,
  wishListId,
  onSuccess
) => ({
  type: WISH_LIST_ACTION_TYPES.START_WISH_LIST_UPDATE,
  payload: {
    updatedWishList,
    wishListId,
    onSuccess,
    loadingText: "Updating wish list"
  }
});

export const updateWishListFail = (errorTitle, errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_FAIL,
  payload: { errorTitle, errorMsg }
});

export const updateWishListSuccess = (
  notificationTitle,
  notificationMsg,
  updatedWishList,
  onSuccess = () => {}
) => ({
  type: WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_SUCCESS,
  payload: {
    notificationTitle,
    notificationMsg,
    updatedWishList,
    onSuccess
  }
});
