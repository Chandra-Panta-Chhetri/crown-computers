import CART_ACTION_TYPES from "./cart.action.types";

const INITIAL_STATE = {
  hidden: true,
  shoppingCart: [],
  cartId: null
};

const cartReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
      return {
        ...prevState,
        hidden: !prevState.hidden
      };
    case CART_ACTION_TYPES.UPDATE_CART:
      return {
        ...prevState,
        shoppingCart: action.payload
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
