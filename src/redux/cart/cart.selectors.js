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
