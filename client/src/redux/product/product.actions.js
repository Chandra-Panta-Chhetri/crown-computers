import PRODUCT_ACTION_TYPES from "./product.action.types";

export const startInitialProductsFetch = () => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_START
});

export const startInitialProductsFetchByCategory = (categoryName) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_FETCH_PRODUCTS_BY_CATEGORY_START,
  payload: categoryName
});

export const initialProductsFetchSuccess = (products, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS,
  payload: { products, lastVisibleDoc }
});

export const initialProductsFetchFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
  payload: errorMsg
});

export const startLoadingMoreProducts = () => ({
  type: PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_START
});

export const startLoadingMoreProductsByCategory = (categoryName) => ({
  type: PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_BY_CATEGORY_START,
  payload: categoryName
});

export const loadingMoreProductsSuccess = (newProducts, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_SUCCESS,
  payload: { newProducts, lastVisibleDoc }
});

export const loadingMoreProductsFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_FAIL,
  payload: errorMsg
});

export const noMoreToLoad = () => ({
  type: PRODUCT_ACTION_TYPES.NO_MORE_TO_LOAD
});

export const startFetchProductById = (id) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_START,
  payload: id
});

export const fetchProductByIdSuccess = (product) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product
});

export const fetchProductByIdFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAIL,
  payload: errorMsg
});
