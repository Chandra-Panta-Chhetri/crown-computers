import { createSelector } from "reselect";

export const selectProduct = (state) => state.product;

export const selectProductCollection = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectIsFetchingProducts = createSelector(
  [selectProduct],
  (product) => product.isFetchingProducts
);
