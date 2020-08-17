import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "../user/user.action.types";
import { clearCart } from "./cart.actions";
import { addSuccessNotification } from "../notification/notification.actions";

function* saveCart() {
  try {
    yield put(
      addSuccessNotification(
        USER_ACTION_TYPES.LOG_OUT_SUCCESS,
        "Log Out Successful",
        "See you next time!"
      )
    );
    yield put(clearCart());
  } catch (e) {}
}

function* watchSuccessfulLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, saveCart);
}

export default function* cartSagas() {
  yield all([call(watchSuccessfulLogOut)]);
}
