import { all, call, put, takeEvery } from "redux-saga/effects";
import CART_ACTION_TYPES from "../cart/cart.action.types";
import {
  addErrorNotification,
  addSuccessNotification
} from "./notification.actions";

function* showErrorNotification({ payload: { errorTitle, errorMsg } }) {
  yield put(addErrorNotification(errorTitle, errorMsg));
}

function* showSuccessNotification({ payload: { successTitle, successMsg } }) {
  yield put(addSuccessNotification(successTitle, successMsg));
}

function* watchErrorNotifications() {
  yield takeEvery([CART_ACTION_TYPES.UPDATE_CART_FAIL], showErrorNotification);
}

function* watchSuccessNotifications() {
  yield takeEvery([], showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotifications), call(watchSuccessNotifications)]);
}
