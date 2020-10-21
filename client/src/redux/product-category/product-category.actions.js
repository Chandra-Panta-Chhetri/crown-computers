import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

export const startInitialCategoriesFetch = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START
});

export const initialCategoriesFetchSuccess = (productCategories) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_SUCCESS,
  payload: productCategories
});

export const initialCategoriesFetchFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
  payload: errorMsg
});
