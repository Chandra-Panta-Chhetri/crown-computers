import COLLECTION_ACTION_TYPES from "./collection.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  collectionFetchFail,
  collectionFetchSuccess
} from "./collection.actions";
import { getProductCollection } from "../../utils/firebase.collection_utils";

function* fetchCollection() {
  try {
    const productCollection = yield getProductCollection();
    yield put(collectionFetchSuccess(productCollection));
  } catch (err) {
    yield put(
      collectionFetchFail(
        "There was a problem with displaying the product collection"
      )
    );
  }
}

function* watchCollectionFetchStart() {
  yield takeLatest(
    COLLECTION_ACTION_TYPES.COLLECTION_FETCH_START,
    fetchCollection
  );
}

export default function* collectionSagas() {
  yield all([call(watchCollectionFetchStart)]);
}
