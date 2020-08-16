import { takeEvery, call, all, put } from "redux-saga/effects";
import CART_ACTION_TYPES from "../cart/cart.action.types";
import { addSuccessNotification } from "./notification.actions";

function* showSuccessNotification({ payload: { id, name, price } }) {
  yield put(
    addSuccessNotification(id, "Added To Cart", `${name} ($${price} ea.)`)
  );
}

function* watchAddToCart() {
  yield takeEvery(CART_ACTION_TYPES.ADD_TO_CART, showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchAddToCart)]);
}
