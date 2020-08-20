import DIRECTORY_ACTION_TYPES from "./directory.action.types";

export const startCategoriesFetch = () => ({
  type: DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_START
});

export const categoriesFetchSuccess = (productCategories) => ({
  type: DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_SUCCESS,
  payload: productCategories
});

export const categoriesFetchError = (errorMsg) => ({
  type: DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL,
  payload: errorMsg
});
