import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory;

export const selectProductCategories = createSelector(
  [selectDirectory],
  (directory) => directory.productCategories
);

export const selectIsFetchingCategories = createSelector(
  [selectDirectory],
  (directory) => directory.isFetchingCategories
);
