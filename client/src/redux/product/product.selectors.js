import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

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

export const selectHasMoreProductsToFetch = createSelector(
  [selectProduct],
  (product) => product.hasMoreToFetch
);

export const selectProductData = createSelector(
  [selectProduct],
  (product) => product.productData
);
