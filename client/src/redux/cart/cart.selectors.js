import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectShoppingCart = createSelector(
  [selectCart],
  (cart) => cart.shoppingCart
);

export const selectCartId = createSelector([selectCart], (cart) => cart.cartId);

export const selectIsUpdatingCart = createSelector(
  [selectCart],
  (cart) => cart.isUpdatingCart
);

export const selectCartLoadingText = createSelector(
  [selectCart],
  (cart) => cart.loadingText
);

export const selectCartVisibility = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectNumCartItems = createSelector(
  [selectShoppingCart],
  (shoppingCart) =>
    shoppingCart.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectShoppingCart],
  (shoppingCart) =>
    shoppingCart.reduce(
      (accumalatedPrice, cartItem) =>
        accumalatedPrice + cartItem.quantity * cartItem.price,
      0
    )
);

export const selectCartItemQuantityById = (id) =>
  createSelector([selectShoppingCart], (shoppingCart) => {
    const cartItem = shoppingCart.find((cartItem) => cartItem.productId === id);
    return cartItem ? cartItem.quantity : 0;
  });
