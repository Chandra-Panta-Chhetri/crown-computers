import PRODUCT_ACTION_TYPES from "./product.action.types";

const INITIAL_STATE = {
  products: [],
  isFetchingProducts: false,
  productsPerPage: 6,
  lastVisibleDoc: null,
  hasMoreToFetch: true,
  productData: {}
};

const productReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_START:
    case PRODUCT_ACTION_TYPES.INITIAL_FETCH_PRODUCTS_BY_CATEGORY_START:
      return {
        ...prevState,
        isFetchingProducts: true,
        products: [],
        hasMoreToFetch: true
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL:
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_FAIL:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAIL:
      return {
        ...prevState,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_START:
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_BY_CATEGORY_START:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_START:
      return {
        ...prevState,
        isFetchingProducts: true,
        productData: {}
      };
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...prevState,
        isFetchingProducts: false,
        products: [...prevState.products, ...action.payload.newProducts],
        lastVisibleDoc: action.payload.lastVisibleDoc
      };
    case PRODUCT_ACTION_TYPES.NO_MORE_TO_LOAD:
      return {
        ...prevState,
        isFetchingProducts: false,
        hasMoreToFetch: false
      };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...prevState,
        productData: action.payload,
        isFetchingProducts: false
      };
    default:
      return prevState;
  }
};

export default productReducer;
