import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

const INITIAL_STATE = {
  productCategories: [],
  isFetchingCategories: false,
  categoriesPerPage: 6,
  lastVisibleDoc: null,
  hasMoreToFetch: true,
  isUpdatingCategories: false,
  loadingText: ""
};

const productCategoryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START:
      return {
        ...prevState,
        isFetchingCategories: true,
        productCategories: [],
        hasMoreToFetch: true,
        lastVisibleDoc: null
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_START:
      return {
        ...prevState,
        isFetchingCategories: true
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL:
    case PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_FAIL:
      return {
        ...prevState,
        isFetchingCategories: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isFetchingCategories: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...prevState,
        productCategories: [
          ...prevState.productCategories,
          ...action.payload.newProductCategories
        ],
        lastVisibleDoc: action.payload.lastVisibleDoc,
        isFetchingCategories: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.NO_MORE_TO_LOAD:
      return {
        ...prevState,
        isFetchingCategories: false,
        hasMoreToFetch: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.START_CATEGORY_DELETE_BY_ID:
    case PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY:
      return {
        ...prevState,
        isUpdatingCategories: true,
        loadingText: action.payload.loadingText
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_FAIL:
    case PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_FAIL:
      return {
        ...prevState,
        isUpdatingCategories: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS:
      return {
        ...prevState,
        productCategories: action.payload,
        isUpdatingCategories: false
      };
    case PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_SUCCESS:
      return {
        ...prevState,
        isUpdatingCategories: false,
        productCategories: [...prevState.productCategories, ...action.payload]
      };
    default:
      return prevState;
  }
};

export default productCategoryReducer;
