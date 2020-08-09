import { createSelector } from "reselect";

export const selectDirectory = (state) => state.directory;

export const selectProductCategories = createSelector(
  [selectDirectory],
  (directory) => directory.productCategories
);
