import { createSelector } from "reselect";

export const selectCollection = (state) => state.collection;

export const selectProductCollection = createSelector(
  [selectCollection],
  (collection) => collection.productCollection
);

export const selectCollectionFromKeys = createSelector(
  [selectProductCollection],
  (productCollection) =>
    Object.keys(productCollection).map((key) => productCollection[key])
);

export const selectCategoryCollection = (route) =>
  createSelector([selectProductCollection], (productCollection) =>
    !productCollection[route] ? { items: [] } : productCollection[route]
  );
