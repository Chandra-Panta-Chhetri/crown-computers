import CART_ACTION_TYPES from "./cart.action.types";
const INITIALSTATE = { hidden: true };

const cartReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
      return {
        ...prevState,
        hidden: !prevState.hidden
      };
    default:
      return prevState;
  }
};

export default cartReducer;
