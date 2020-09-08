import PRODUCT_ACTION_TYPES from "./product.action.types";

const INITIAL_STATE = {
  products: [],
  isFetchingProducts: false,
  productsPerPage: 6,
  lastVisibleDoc: null,
  isFetchingMoreProducts: false,
  hasMoreToLoad: true
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_START:
    case PRODUCT_ACTION_TYPES.INITIAL_FETCH_PRODUCTS_BY_CATEGORY_START:
      return {
        ...prevState,
        isFetchingProducts: true,
        products: [],
        hasMoreToLoad: true
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_SUCCESS:
      return {
        ...prevState,
        products: action.payload.products,
        lastVisibleDoc: action.payload.lastVisibleDoc,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_START:
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_BY_CATEGORY_START:
      return {
        ...prevState,
        isFetchingMoreProducts: true
      };
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...prevState,
        isFetchingMoreProducts: false,
        products: [...prevState.products, ...action.payload.newProducts],
        lastVisibleDoc: action.payload.lastVisibleDoc
      };
    case PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_FAIL:
      return {
        ...prevState,
        isFetchingMoreProducts: false
      };
    case PRODUCT_ACTION_TYPES.NO_MORE_TO_LOAD:
      return {
        ...prevState,
        isFetchingMoreProducts: false,
        hasMoreToLoad: false
      };
    default:
      return prevState;
  }
};

export default collectionReducer;
