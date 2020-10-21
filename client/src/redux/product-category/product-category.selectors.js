import { createSelector } from "reselect";

const selectProductCategory = (state) => state.productCategory;

export const selectProductCategories = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.productCategories
);

export const selectIsFetchingCategories = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.isFetchingCategories
);
