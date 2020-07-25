import { all, call } from "redux-saga/effects";
import collectionSaga from "./collection/collection.sagas";
import userSaga from "./user/user.sagas";

function* rootSaga() {
  yield all([call(collectionSaga), call(userSaga)]);
}

export default rootSaga;
