import { all, call } from "redux-saga/effects";
import { watchCollectionFetchSaga } from "./collection/collection.sagas";
import { watchEmailSignInSaga, watchGoogleSignInSaga } from "./user/user.sagas";

function* rootSaga() {
  yield all([
    call(watchCollectionFetchSaga),
    call(watchEmailSignInSaga),
    call(watchGoogleSignInSaga)
  ]);
}

export default rootSaga;
