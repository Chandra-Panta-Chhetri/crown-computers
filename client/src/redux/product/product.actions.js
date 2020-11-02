import PRODUCT_ACTION_TYPES from "./product.action.types";

export const startInitialProductsFetch = () => ({
  type: PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH
});

export const startInitialProductsFetchByCategory = (
  categoryName,
  onFail = () => {}
) => ({
  type: PRODUCT_ACTION_TYPES.START_INITIAL_FETCH_PRODUCTS_BY_CATEGORY,
  payload: { categoryName, onFail }
});

export const initialProductsFetchFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
  payload: { errorTitle: "Products Fetching Failed", errorMsg }
});

export const initialProductsFetchSuccess = (products, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS,
  payload: { products, lastVisibleDoc }
});

export const startLoadingMoreProducts = () => ({
  type: PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS
});

export const startLoadingMoreProductsByCategory = (categoryName) => ({
  type: PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS_BY_CATEGORY,
  payload: categoryName
});

export const loadingMoreProductsFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_FAIL,
  payload: { errorTitle: "Fetching More Products Failed", errorMsg }
});

export const loadingMoreProductsSuccess = (newProducts, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_SUCCESS,
  payload: { newProducts, lastVisibleDoc }
});

export const noMoreProductsToLoad = () => ({
  type: PRODUCT_ACTION_TYPES.NO_MORE_PRODUCTS_TO_LOAD
});

export const startFetchProductById = (id, onFail = () => {}) => ({
  type: PRODUCT_ACTION_TYPES.START_FETCH_PRODUCT_BY_ID,
  payload: { id, onFail }
});

export const fetchProductByIdFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAIL,
  payload: { errorTitle: "Product Not Found", errorMsg }
});

export const fetchProductByIdSuccess = (product) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product
});
