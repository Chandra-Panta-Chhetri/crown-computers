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
import { clearCart } from "./cart.actions";
import { createSuccessNotification } from "../notification/notification.sagas";
import { saveCartToDb } from "../../utils/firebase.utils";
import { selectShoppingCart } from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";

function* handleCartChange(action) {
  const { payload } = action;
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_TO_CART:
      return yield createSuccessNotification(
        "Added To Cart",
        `${payload.name} ($${payload.price} ea.)`
      );
    case CART_ACTION_TYPES.REMOVE_FROM_CART:
      return yield createSuccessNotification("Removed From Cart", payload.name);
  }
  const cart = select(selectShoppingCart);
  const currentUser = select(selectCurrentUser);
  yield saveCartToDb(currentUser, cart);
}

function* handleLogOutSuccess() {
  yield createSuccessNotification("Log Out Successful", "See you next time!");
  yield put(clearCart());
}

function* watchSuccessfulLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, handleLogOutSuccess);
}

function* watchCartModification() {
  yield takeEvery(
    [
      CART_ACTION_TYPES.ADD_TO_CART,
      CART_ACTION_TYPES.REMOVE_FROM_CART,
      CART_ACTION_TYPES.CHANGE_QUANTITY
    ],
    handleCartChange
  );
}

export default function* cartSagas() {
  yield all([call(watchSuccessfulLogOut), call(watchCartModification)]);
}
