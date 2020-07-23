import COLLECTION_ACTION_TYPES from "./collection.action.types";

const INITIAL_STATE = {
  productCollection: {},
  isFetchingFromDB: false,
  fetchingErrorMsg: null
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_FROM_DB:
      return {
        ...prevState,
        isFetchingFromDB: true
      };
    case COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_SUCCESS:
      return {
        ...prevState,
        productCollection: action.payload,
        isFetchingFromDB: false
      };
    case COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_FAILED:
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
