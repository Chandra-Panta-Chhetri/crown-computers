import CART_ACTION_TYPES from "../cart/cart.action.types";
import CHECKOUT_ACTION_TYPES from "../checkout/checkout.action.types";
import USER_ACTION_TYPES from "../user/user.action.types";
import SALE_ACTION_TYPES from "../sale/sale.action.types";
import { all, call, put, takeEvery } from "redux-saga/effects";
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
  yield takeEvery(
    [
      CART_ACTION_TYPES.UPDATE_CART_FAIL,
      CHECKOUT_ACTION_TYPES.CHECKOUT_FAIL,
      USER_ACTION_TYPES.SIGN_UP_FAIL,
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      USER_ACTION_TYPES.SIGN_IN_FAIL,
      SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL,
      SALE_ACTION_TYPES.LOADING_MORE_SALES_FAIL,
      SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_FAIL
    ],
    showErrorNotification
  );
}

function* watchSuccessNotifications() {
  yield takeEvery([], showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotifications), call(watchSuccessNotifications)]);
}
