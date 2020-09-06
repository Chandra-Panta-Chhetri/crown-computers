import PRODUCT_ACTION_TYPES from "./product.action.types";

const INITIAL_STATE = {
  products: [],
  isFetchingProducts: false
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_START:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...prevState,
        isFetchingProducts: true
      };
    case PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_SUCCESS:
      return {
        ...prevState,
        products: action.payload,
        isFetchingProducts: false
      };
    case PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingProducts: false
      };
    default:
      return prevState;
  }
};

export default collectionReducer;
