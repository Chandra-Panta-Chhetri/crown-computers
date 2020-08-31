import DIRECTORY_ACTION_TYPES from "./directory.action.types";

const INITIAL_STATE = {
  productCategories: [],
  isFetchingCategories: false
};

const directoryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_START:
      return {
        ...prevState,
        isFetchingCategories: true
      };
    case DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_SUCCESS:
      return {
        ...prevState,
        isFetchingCategories: false,
        productCategories: action.payload
      };

    case DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingCategories: false
      };
    default:
      return prevState;
  }
};

export default directoryReducer;
