import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

export const startInitialCategoriesFetch = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START
});

export const initialCategoriesFetchSuccess = (
  productCategories,
  lastVisibleDoc
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_SUCCESS,
  payload: { productCategories, lastVisibleDoc }
});

export const initialCategoriesFetchFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
  payload: errorMsg
});

export const startLoadingMoreCategories = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_START
});

export const loadingMoreCategoriesFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_FAIL,
  payload: errorMsg
});

export const loadingMoreCategoriesSuccess = (
  newProductCategories,
  lastVisibleDoc
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_SUCCESS,
  payload: { newProductCategories, lastVisibleDoc }
});

export const noMoreToLoad = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.NO_MORE_TO_LOAD
});

export const startDeleteCategoryById = (categoryId, categoryName) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.START_CATEGORY_DELETE_BY_ID,
  payload: {
    categoryId,
    categoryName,
    loadingText: "Deleting product category"
  }
});

export const deleteCategoryByIdFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_FAIL,
  payload: errorMsg
});

export const deleteCategoryByIdSuccess = (updatedProductCategories) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS,
  payload: updatedProductCategories
});
