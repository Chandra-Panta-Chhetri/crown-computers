import COLLECTION_ACTION_TYPES from "./collection.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  collectionFetchError,
  collectionFetchSuccess
} from "./collection.actions";
import { getShopData } from "../../utils/firebase.utils";

function* fetchCollectionSaga() {
  try {
    const productCollection = yield call(getShopData);
    yield put(collectionFetchSuccess(productCollection));
  } catch (e) {
    yield put(collectionFetchError(e.message));
  }
}

function* watchCollectionFetchSaga() {
  yield takeLatest(
    COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START,
    fetchCollectionSaga
  );
}

export default function* collectionSaga() {
  yield all([call(watchCollectionFetchSaga)]);
}
