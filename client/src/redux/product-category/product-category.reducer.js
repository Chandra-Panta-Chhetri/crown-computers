import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

const INITIAL_STATE = {
  productCategories: [],
  isFetchingCategories: false
};

const productCategoryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START:
      return {
        ...prevState,
        isFetchingCategories: true
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_SUCCESS:
      return {
        ...prevState,
        isFetchingCategories: false,
        productCategories: action.payload
      };

    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingCategories: false
      };
    default:
      return prevState;
  }
};

export default productCategoryReducer;
