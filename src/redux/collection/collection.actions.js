import COLLECTION_ACTION_TYPES from "./collection.action.types";

import { getShopDataFromDb } from "../../utils/firebaseUtils";

export const setFetchingItems = () => ({
  type: COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_FROM_DB
});

export const getProductCollection = () => async (dispatch) => {
  dispatch(setFetchingItems());
  try {
    const productCollection = await getShopDataFromDb();
    dispatch({
      type: COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_SUCCESS,
      payload: productCollection
    });
  } catch (e) {
    dispatch(setFetchingCollectionError(e.message));
  }
};

export const setFetchingCollectionError = (errorMessage) => ({
  type: COLLECTION_ACTION_TYPES.FETCHING_COLLECTION_FAILED,
  payload: errorMessage
});
