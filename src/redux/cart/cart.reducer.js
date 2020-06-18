import CART_ACTION_TYPES from "./cart.action.types";
const INITIALSTATE = {
  hidden: true,
  shoppingCart: []
};

const cartReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
      return {
        ...prevState,
        hidden: !prevState.hidden
      };
    case CART_ACTION_TYPES.ADD_TO_CART:
      return {
        ...prevState,
        shoppingCart: [...prevState.shoppingCart, action.payload]
      };
    default:
      return prevState;
  }
};

export default cartReducer;
