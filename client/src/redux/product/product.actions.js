import PRODUCT_ACTION_TYPES from "./product.action.types";

export const startInitialProductsFetch = (minStockQuantity = 0) => ({
  type: PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH,
  payload: minStockQuantity
});

export const startInitialProductsFetchByCategory = (
  categoryName,
  onFail = () => {},
  minStockQuantity = 0
) => ({
  type: PRODUCT_ACTION_TYPES.START_INITIAL_FETCH_PRODUCTS_BY_CATEGORY,
  payload: { categoryName, onFail, minStockQuantity }
});

export const initialProductsFetchFail = (errorMsg) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
  payload: { errorTitle: "Products Fetching Failed", errorMsg }
});

export const initialProductsFetchSuccess = (products, lastVisibleDoc) => ({
  type: PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS,
  payload: { products, lastVisibleDoc }
});

export const startLoadingMoreProducts = (minStockQuantity = 0) => ({
  type: PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS,
  payload: minStockQuantity
});

export const startLoadingMoreProductsByCategory = (
  categoryName,
  minStockQuantity = 0
) => ({
  type: PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS_BY_CATEGORY,
  payload: { categoryName, minStockQuantity }
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
