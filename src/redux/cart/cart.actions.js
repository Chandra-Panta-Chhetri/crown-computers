import CART_ACTION_TYPES from "./cart.action.types";

export const toggleCartVisibility = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY
});

export const addToCart = (item) => ({
  type: CART_ACTION_TYPES.ADD_TO_CART,
  payload: item
});

export const removeFromCart = (item) => ({
  type: CART_ACTION_TYPES.REMOVE_FROM_CART,
  payload: item
});

export const changeQuantity = (item, newQuantity) => {
  return {
    type: CART_ACTION_TYPES.CHANGE_QUANTITY,
    payload: {
      item,
      newQuantity
    }
  };
};
