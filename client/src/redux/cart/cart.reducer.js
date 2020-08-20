import { addToCart, changeItemQuantity } from "./cart.utils";
import { removeFromCart } from "./cart.utils";

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
        shoppingCart: addToCart(prevState.shoppingCart, action.payload)
      };
    case CART_ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...prevState,
        shoppingCart: removeFromCart(prevState.shoppingCart, action.payload)
      };
    case CART_ACTION_TYPES.CHANGE_QUANTITY:
      return {
        ...prevState,
        shoppingCart: changeItemQuantity(prevState.shoppingCart, action.payload)
      };
    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...prevState,
        shoppingCart: []
      };
    case CART_ACTION_TYPES.RESTORE_CART_FROM_DB:
      return {
        ...prevState,
        shoppingCart: action.payload
      };
    default:
      return prevState;
  }
};

export default cartReducer;
