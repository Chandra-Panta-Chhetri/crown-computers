import WISH_LIST_ACTION_TYPES from "./wish-list.action.types";

export const startWishListsFetch = () => ({
  type: WISH_LIST_ACTION_TYPES.START_WISH_LISTS_FETCH
});

export const wishListsFetchFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_FAIL,
  payload: { errorTitle: "Wish Lists Fetching Failed", errorMsg }
});

export const wishListsFetchSuccess = (wishLists) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_SUCCESS,
  payload: wishLists
});

export const startWishListFetchById = (wishListId, onFail = () => {}) => ({
  type: WISH_LIST_ACTION_TYPES.START_FETCH_WISH_LIST_BY_ID,
  payload: { wishListId, onFail }
});

export const fetchWishListByIdFail = (errorMsg) => ({
  type: WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_FAIL,
  payload: { errorTitle: "Wish List Not Found", errorMsg }
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
  payload: { errorTitle: "Deleting Wish List Failed", errorMsg }
});

export const deleteWishListByIdSuccess = (successMsg, wishLists) => ({
  type: WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_SUCCESS,
  payload: { successTitle: "Wish List Deleted", successMsg, wishLists }
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
  payload: { errorTitle: "Creating Wish List Failed", errorMsg }
});

export const createWishListSuccess = (createdWishList, successMsg) => ({
  type: WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_SUCCESS,
  payload: {
    createdWishList,
    successTitle: "Wish List Created",
    successMsg
  }
});

export const addToWishList = (item, wishList, onSuccess) => ({
  type: WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST,
  payload: {
    item,
    wishList,
    onSuccess,
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
  successTitle,
  successMsg,
  updatedWishList
) => ({
  type: WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_SUCCESS,
  payload: {
    successTitle,
    successMsg,
    updatedWishList
  }
});
