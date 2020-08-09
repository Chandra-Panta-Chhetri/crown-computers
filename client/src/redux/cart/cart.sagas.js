import { takeLatest, put, call, all } from "redux-saga/effects";
import USER_ACTION_TYPES from "../user/user.action.types";
import { clearCart } from "./cart.actions";

function* saveCart() {
  try {
    yield put(clearCart());
  } catch (e) {}
}

function* watchSuccessfulLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, saveCart);
}

export default function* cartSagas() {
  yield all([call(watchSuccessfulLogOut)]);
}
