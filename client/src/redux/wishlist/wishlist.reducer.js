import WISHLIST_ACTION_TYPES from "./wishlist.action.types";

const INITIAL_STATE = {
  wishlists: {},
  wishlistData: {},
  isFetchingWishlists: false,
  isUpdatingWishlist: false,
  loadingText: ""
};

const wishlistReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case WISHLIST_ACTION_TYPES.START_WISHLISTS_FETCH:
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_START:
      return {
        ...prevState,
        isFetchingWishlists: true
      };
    case WISHLIST_ACTION_TYPES.WISHLISTS_FETCH_FAIL:
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_FAIL:
      return {
        ...prevState,
        isFetchingWishlists: false
      };
    case WISHLIST_ACTION_TYPES.WISHLISTS_FETCH_SUCCESS:
      return {
        ...prevState,
        isFetchingWishlists: false,
        wishlists: action.payload
      };
    case WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_SUCCESS:
      return {
        ...prevState,
        isFetchingWishlists: false,
        wishlistData: action.payload
      };
    case WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST:
    case WISHLIST_ACTION_TYPES.START_REMOVE_FROM_WISHLIST:
    case WISHLIST_ACTION_TYPES.START_WISHLIST_DELETE_BY_ID:
    case WISHLIST_ACTION_TYPES.CREATE_NEW_WISHLIST:
      return {
        ...prevState,
        isUpdatingWishlist: true,
        loadingText: action.payload.loadingText
      };
    case WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAIL:
    case WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_FAIL:
    case WISHLIST_ACTION_TYPES.CREATE_WISHLIST_FAIL:
      return {
        ...prevState,
        isUpdatingWishlist: false
      };
    case WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS:
    case WISHLIST_ACTION_TYPES.CREATE_WISHLIST_SUCCESS:
    case WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_SUCCESS:
      return {
        ...prevState,
        isUpdatingWishlist: false,
        wishlists: action.payload.wishlists
      };
    default:
      return prevState;
  }
};

export default wishlistReducer;
