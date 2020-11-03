import WISH_LIST_ACTION_TYPES from "./wish-list.action.types";

const INITIAL_STATE = {
  wishLists: [],
  wishListData: {},
  isFetchingWishLists: false,
  isUpdatingWishList: false,
  loadingText: ""
};

const wishListReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case WISH_LIST_ACTION_TYPES.START_WISH_LISTS_FETCH:
    case WISH_LIST_ACTION_TYPES.START_FETCH_WISH_LIST_BY_ID:
      return {
        ...prevState,
        isFetchingWishLists: true
      };
    case WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_FAIL:
    case WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_FAIL:
      return {
        ...prevState,
        isFetchingWishLists: false
      };
    case WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_SUCCESS:
      return {
        ...prevState,
        isFetchingWishLists: false,
        wishLists: action.payload
      };
    case WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_SUCCESS:
      return {
        ...prevState,
        isFetchingWishLists: false,
        wishListData: action.payload
      };
    case WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST:
    case WISH_LIST_ACTION_TYPES.START_REMOVE_FROM_WISH_LIST:
    case WISH_LIST_ACTION_TYPES.START_WISH_LIST_DELETE_BY_ID:
    case WISH_LIST_ACTION_TYPES.CREATE_NEW_WISH_LIST:
    case WISH_LIST_ACTION_TYPES.START_WISH_LIST_UPDATE:
      return {
        ...prevState,
        isUpdatingWishList: true,
        loadingText: action.payload.loadingText
      };
    case WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_FAIL:
    case WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_FAIL:
    case WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_FAIL:
      return {
        ...prevState,
        isUpdatingWishList: false
      };
    case WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_SUCCESS:
      return {
        ...prevState,
        isUpdatingWishList: false,
        wishLists: action.payload.wishLists
      };
    case WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_SUCCESS:
      return {
        ...prevState,
        isUpdatingWishList: false,
        wishLists: [...prevState.wishLists, action.payload.createdWishList]
      };
    case WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_SUCCESS:
      return {
        ...prevState,
        isUpdatingWishList: false,
        wishListData: {
          ...prevState.wishListData,
          ...action.payload.updatedWishList
        }
      };
    default:
      return prevState;
  }
};

export default wishListReducer;
