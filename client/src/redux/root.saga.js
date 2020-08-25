import { all, call } from "redux-saga/effects";

import collectionSagas from "./collection/collection.sagas";
import userSagas from "./user/user.sagas";
import cartSagas from "./cart/cart.sagas";
import notificationSagas from "./notification/notification.sagas";
import directorySagas from "./directory/directory.sagas";

function* rootSaga() {
  yield all([
    call(collectionSagas),
    call(userSagas),
    call(cartSagas),
    call(notificationSagas),
    call(directorySagas)
  ]);
}

export default rootSaga;
