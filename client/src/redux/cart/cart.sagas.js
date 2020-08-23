import USER_ACTION_TYPES from "../user/user.action.types";
import CART_ACTION_TYPES from "./cart.action.types";
import {
  takeLatest,
  takeEvery,
  put,
  call,
  all,
  select
} from "redux-saga/effects";
import { clearCart, updateCart } from "./cart.actions";
import { createSuccessNotification } from "../notification/notification.sagas";
import { saveCartToDb } from "../../utils/firebase.cart_utils";
import { selectShoppingCart } from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { addToCart, changeItemQuantity, removeFromCart } from "./cart.utils";

function* handleCartChange(action) {
  const { payload } = action;
  const cart = yield select(selectShoppingCart);
  const currentUser = yield select(selectCurrentUser);
  let updatedCart;
  switch (action.type) {
    case CART_ACTION_TYPES.START_ADD_TO_CART:
      updatedCart = yield call(addToCart, cart, payload, !!currentUser);
      yield createSuccessNotification(
        "Added To Cart",
        `${payload.name} ($${payload.price} ea.)`
      );
      break;
    case CART_ACTION_TYPES.START_REMOVE_FROM_CART:
      updatedCart = yield call(removeFromCart, cart, payload, !!currentUser);
      yield createSuccessNotification("Removed From Cart", payload.name);
      break;
    case CART_ACTION_TYPES.START_CHANGE_QUANTITY:
      updatedCart = yield call(changeItemQuantity, cart, payload);
      break;
  }
  yield put(updateCart(updatedCart));
}

function* persistCart({ payload: cart }) {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    yield saveCartToDb(currentUser, cart);
  }
}

function* handleLogOutSuccess() {
  yield createSuccessNotification("Log Out Successful", "See you next time!");
  yield put(clearCart());
}

function* watchSuccessfulLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, handleLogOutSuccess);
}

function* watchCartUpdate() {
  yield takeLatest(CART_ACTION_TYPES.UPDATE_CART, persistCart);
}

function* watchCartModification() {
  yield takeEvery(
    [
      CART_ACTION_TYPES.START_ADD_TO_CART,
      CART_ACTION_TYPES.START_REMOVE_FROM_CART,
      CART_ACTION_TYPES.START_CHANGE_QUANTITY
    ],
    handleCartChange
  );
}

export default function* cartSagas() {
  yield all([
    call(watchSuccessfulLogOut),
    call(watchCartModification),
    call(watchCartUpdate)
  ]);
}
