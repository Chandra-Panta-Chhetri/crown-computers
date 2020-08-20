import COLLECTION_ACTION_TYPES from "./collection.action.types";

export const startCollectionFetch = () => ({
  type: COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START
});

export const collectionFetchSuccess = (productCollection) => ({
  type: COLLECTION_ACTION_TYPES.COLLECTION_FETCH_SUCCESS,
  payload: productCollection
});

export const collectionFetchFail = (errorMsg) => ({
  type: COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAIL,
  payload: errorMsg
});
