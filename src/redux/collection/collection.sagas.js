import COLLECTION_ACTION_TYPES from "./collection.action.types";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  collectionFetchError,
  collectionFetchSuccess
} from "./collection.actions";
import { getShopDataFromDb } from "../../utils/firebaseUtils";

function* fetchCollectionSaga() {
  try {
    const productCollection = yield call(getShopDataFromDb);
    yield put(collectionFetchSuccess(productCollection));
  } catch (e) {
    yield put(collectionFetchError(e.message));
  }
}

export function* watchCollectionFetchSaga() {
  yield takeLatest(
    COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START,
    fetchCollectionSaga
  );
}
