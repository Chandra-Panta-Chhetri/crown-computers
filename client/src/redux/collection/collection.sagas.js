import COLLECTION_ACTION_TYPES from "./collection.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  collectionFetchFail,
  collectionFetchSuccess
} from "./collection.actions";
import { getShopData } from "../../utils/firebase.utils";

function* fetchCollection() {
  try {
    const productCollection = yield call(getShopData);
    yield put(collectionFetchSuccess(productCollection));
  } catch (e) {
    yield put(
      collectionFetchFail(
        "There was a problem with displaying the product collection"
      )
    );
  }
}

function* watchCollectionFetch() {
  yield takeLatest(
    COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START,
    fetchCollection
  );
}

export default function* collectionSagas() {
  yield all([call(watchCollectionFetch)]);
}
