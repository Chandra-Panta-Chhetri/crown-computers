import { createSelector } from "reselect";

export const selectCollection = (state) => state.collection;

export const selectProductCollection = createSelector(
  [selectCollection],
  (collection) => collection.productCollection
);

export const selectIsFetchingCollection = createSelector(
  [selectCollection],
  (collection) => collection.isFetchingCollection
);

export const selectCollectionFromKeys = createSelector(
  [selectProductCollection],
  (productCollection) =>
    Object.keys(productCollection).map((key) => productCollection[key])
);

export const selectProductsInCategory = (categoryName) =>
  createSelector([selectProductCollection], (productCollection) =>
    !productCollection[categoryName]
      ? { products: [] }
      : productCollection[categoryName]
  );
