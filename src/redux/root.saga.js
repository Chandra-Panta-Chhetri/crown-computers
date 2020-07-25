import { all, call } from "redux-saga/effects";
import { watchCollectionFetchSaga } from "./collection/collection.sagas";

function* rootSaga() {
  yield all([call(watchCollectionFetchSaga)]);
}

export default rootSaga;
