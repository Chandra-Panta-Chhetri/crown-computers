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

export const selectCategoriesPerPage = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.categoriesPerPage
);

export const selectLastVisibleDoc = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.lastVisibleDoc
);

export const selectHasMoreCategoriesToFetch = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.hasMoreToFetch
);

export const selectIsUpdatingCategories = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.isUpdatingCategories
);

export const selectCategoryLoadingText = createSelector(
  [selectProductCategory],
  (productCategory) => productCategory.loadingText
);
