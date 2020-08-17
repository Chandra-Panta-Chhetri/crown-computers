import { takeEvery, call, all, put } from "redux-saga/effects";
import CART_ACTION_TYPES from "../cart/cart.action.types";
import { addSuccessNotification } from "./notification.actions";

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

function* watchAddToCart() {
  yield takeEvery(CART_ACTION_TYPES.ADD_TO_CART, showAddedToCartNotification);
}

function* watchRemoveFromCart() {
  yield takeEvery(
    CART_ACTION_TYPES.REMOVE_FROM_CART,
    showRemovedFromCartNotification
  );
}

export default function* notificationSagas() {
  yield all([call(watchAddToCart), call(watchRemoveFromCart)]);
}
