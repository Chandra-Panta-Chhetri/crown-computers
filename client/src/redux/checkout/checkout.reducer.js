import CHECKOUT_ACTION_TYPES from "./checkout.action.types";

const INITIAL_STATE = {
  isCheckingOut: false
};

const checkoutReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECKOUT_ACTION_TYPES.START_CHECKOUT:
      return {
        ...prevState,
        isCheckingOut: true
      };
    case CHECKOUT_ACTION_TYPES.CHECKOUT_SUCCESS:
    case CHECKOUT_ACTION_TYPES.CHECKOUT_FAIL:
      return {
        ...prevState,
        isCheckingOut: false
      };
    default:
      return prevState;
  }
};

export default checkoutReducer;
