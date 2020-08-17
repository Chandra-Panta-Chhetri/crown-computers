import { takeEvery, call, all, put, takeLatest } from "redux-saga/effects";
import CART_ACTION_TYPES from "../cart/cart.action.types";
import USER_ACTION_TYPES from "../user/user.action.types";
import {
  addSuccessNotification,
  addErrorNotification
} from "./notification.actions";

function* showAddedToCartNotification({ payload: { id, name, price } }) {
  yield put(
    addSuccessNotification(id, "Added To Cart", `${name} ($${price} ea.)`)
  );
}

function* showRemovedFromCartNotification({ payload: { id, name, price } }) {
  yield put(
    addSuccessNotification(id, "Removed From Cart", `${name} ($${price} ea.)`)
  );
}

function* showSignInFailNotification({ payload: signInFailMsg }) {
  yield put(
    addErrorNotification(
      USER_ACTION_TYPES.SIGN_IN_FAIL,
      "Sign In Failed",
      `${signInFailMsg}`
    )
  );
}

function* showSignInSuccessNotification({ payload: { fullName } }) {
  yield put(
    addSuccessNotification(
      USER_ACTION_TYPES.SIGN_IN_SUCCESS,
      "Sign In Success",
      `Welcome back ${fullName.toUpperCase()}!`
    )
  );
}

function* showLogOutFailNotification({ payload: logOutFailMsg }) {
  yield put(
    addErrorNotification(
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      "Log Out Failed",
      `${logOutFailMsg}`
    )
  );
}

function* watchAddToCart() {
  yield takeEvery(CART_ACTION_TYPES.ADD_TO_CART, showAddedToCartNotification);
}

function* watchRemoveFromCart() {
  yield takeEvery(
    CART_ACTION_TYPES.REMOVE_FROM_CART,
    showRemovedFromCartNotification
  );
}

function* watchSignInFail() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_FAIL, showSignInFailNotification);
}

function* watchSignInSuccess() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    showSignInSuccessNotification
  );
}

function* watchLogOutFail() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_FAIL, showLogOutFailNotification);
}

export default function* notificationSagas() {
  yield all([
    call(watchAddToCart),
    call(watchRemoveFromCart),
    call(watchSignInFail),
    call(watchSignInSuccess),
    call(watchLogOutFail)
  ]);
}
