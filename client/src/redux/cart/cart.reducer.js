import CART_ACTION_TYPES from "./cart.action.types";
// import { addToCart, changeItemQuantity } from "./cart.utils";
// import { removeFromCart } from "./cart.utils";

const INITIALSTATE = {
  hidden: true,
  shoppingCart: [],
  cartRef: null
};

const cartReducer = (prevState = INITIALSTATE, action) => {
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
    // case CART_ACTION_TYPES.ADD_TO_CART:
    //   return {
    //     ...prevState,
    //     shoppingCart: addToCart(prevState.shoppingCart, action.payload)
    //   };
    // case CART_ACTION_TYPES.REMOVE_FROM_CART:
    //   return {
    //     ...prevState,
    //     shoppingCart: removeFromCart(prevState.shoppingCart, action.payload)
    //   };
    // case CART_ACTION_TYPES.CHANGE_QUANTITY:
    //   return {
    //     ...prevState,
    //     shoppingCart: changeItemQuantity(prevState.shoppingCart, action.payload)
    //   };
    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...prevState,
        shoppingCart: [],
        cartRef: null
      };
    case CART_ACTION_TYPES.RESTORE_CART:
      return {
        ...prevState,
        shoppingCart: action.payload.cart,
        cartRef: action.payload.cartId
      };
    default:
      return prevState;
  }
};

export default cartReducer;
