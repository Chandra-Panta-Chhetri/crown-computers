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

export const selectProductsPerPage = createSelector(
  [selectProduct],
  (product) => product.productsPerPage
);

export const selectLastVisibleDoc = createSelector(
  [selectProduct],
  (product) => product.lastVisibleDoc
);

export const selectHasMoreToLoad = createSelector(
  [selectProduct],
  (product) => product.hasMoreToLoad
);
