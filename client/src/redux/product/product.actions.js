import PRODUCT_ACTION_TYPES from "./product.action.types";

export const startProductsFetch = () => ({
  type: PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_START
});

export const startProductsFetchByCategory = (categoryName) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORY,
  payload: categoryName
});

export const productsFetchSuccess = (products) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_SUCCESS,
  payload: products
});

export const productsFetchFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_FAIL,
  payload: errorMsg
});
