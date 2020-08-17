import COLLECTION_ACTION_TYPES from "./collection.action.types";

const INITIAL_STATE = {
  productCollection: {},
  isFetchingCollection: false
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START:
      return {
        ...prevState,
        isFetchingCollection: true
      };
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_SUCCESS:
      return {
        ...prevState,
        productCollection: action.payload,
        isFetchingCollection: false
      };
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAIL:
      return {
        ...prevState,
        isFetchingCollection: false
      };
    default:
      return prevState;
  }
};

export default collectionReducer;
