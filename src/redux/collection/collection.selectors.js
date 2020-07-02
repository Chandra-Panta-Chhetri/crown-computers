import { createSelector } from "reselect";

export const selectCollection = (state) => state.collection;

export const selectProductCollection = createSelector(
  [selectCollection],
  (collection) => collection.productCollection
);
