import CART_ACTION_TYPES from "./cart.action.types";

export const toggleCartVisibility = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY
});

export const addToCart = (item) => ({
  type: CART_ACTION_TYPES.ADD_TO_CART,
  payload: item
});
