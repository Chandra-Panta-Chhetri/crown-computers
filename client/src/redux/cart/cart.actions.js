import CART_ACTION_TYPES from "./cart.action.types";

export const toggleCartVisibility = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY
});

export const addToCart = (item) => ({
  type: CART_ACTION_TYPES.START_ADD_TO_CART,
  payload: item
});

export const removeFromCart = (item) => ({
  type: CART_ACTION_TYPES.START_REMOVE_FROM_CART,
  payload: item
});

export const changeQuantity = (item, newQuantity) => ({
  type: CART_ACTION_TYPES.START_CHANGE_QUANTITY,
  payload: { item, newQuantity }
});

// export const addToCart = (item) => ({
//   type: CART_ACTION_TYPES.ADD_TO_CART,
//   payload: item
// });

// export const removeFromCart = (item) => ({
//   type: CART_ACTION_TYPES.REMOVE_FROM_CART,
//   payload: item
// });

// export const changeQuantity = (item, newQuantity) => ({
//   type: CART_ACTION_TYPES.CHANGE_QUANTITY,
//   payload: { item, newQuantity }
// });

export const updateCart = (cart) => ({
  type: CART_ACTION_TYPES.UPDATE_CART,
  payload: cart
});

export const clearCart = () => ({
  type: CART_ACTION_TYPES.CLEAR_CART
});

export const restoreCart = (cart, cartId) => ({
  type: CART_ACTION_TYPES.RESTORE_CART,
  payload: { cart, cartId }
});
