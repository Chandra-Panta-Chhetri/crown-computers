import COLLECTION_ACTION_TYPES from "./collection.action.types";

const INITIAL_STATE = {
  productCollection: {},
  isFetchingFromDB: false,
  fetchingErrorMsg: null
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START:
      return {
        ...prevState,
        isFetchingFromDB: true
      };
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_SUCCESS:
      return {
        ...prevState,
        productCollection: action.payload,
        isFetchingFromDB: false
      };
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAILED:
      return {
        ...prevState,
        isFetchingFromDB: false,
        fetchingErrorMsg: action.payload
      };
    default:
      return prevState;
  }
};

export default collectionReducer;
