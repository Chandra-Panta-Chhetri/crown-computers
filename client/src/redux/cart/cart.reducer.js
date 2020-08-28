import CART_ACTION_TYPES from "./cart.action.types";

const INITIAL_STATE = {
  hidden: true,
  shoppingCart: [],
  cartId: null,
  isUpdatingCart: false,
  loadingText: "hi"
};

const cartReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
      return {
        ...prevState,
        hidden: !prevState.hidden
      };
    case CART_ACTION_TYPES.START_ADD_TO_CART:
    case CART_ACTION_TYPES.START_CHANGE_QUANTITY:
    case CART_ACTION_TYPES.START_REMOVE_FROM_CART:
      return {
        ...prevState,
        isUpdatingCart: true,
        loadingText: action.payload.loadingText
      };
    case CART_ACTION_TYPES.UPDATE_CART:
      return {
        ...prevState,
        shoppingCart: action.payload,
        isUpdatingCart: false
      };
    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...prevState,
        shoppingCart: [],
        cartId: null
      };
    case CART_ACTION_TYPES.RESTORE_CART:
      return {
        ...prevState,
        shoppingCart: action.payload.cart,
        cartId: action.payload.cartId
      };
    default:
      return prevState;
  }
};

export default cartReducer;
