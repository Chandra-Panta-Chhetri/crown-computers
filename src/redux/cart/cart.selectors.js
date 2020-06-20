import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.shoppingCart
);

export const selectNumCartItems = createSelector(
  [selectCartItems],
  (shoppingCart) =>
    shoppingCart.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartVisibility = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (shoppingCart) =>
    shoppingCart.reduce(
      (accumalatedPrice, cartItem) =>
        accumalatedPrice + cartItem.quantity * cartItem.price,
      0
    )
);
