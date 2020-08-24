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
import { selectShoppingCart, selectCartId } from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { addToCart, changeItemQuantity, removeFromCart } from "./cart.utils";

function* handleAddingItemToCart({ payload: item }) {
  const cart = yield select(selectShoppingCart);
  const currentUser = yield select(selectCurrentUser);

  const updatedCart = yield addToCart(cart, item, !!currentUser);
  yield createSuccessNotification(
    "Added To Cart",
    `${item.name} ($${item.price} ea.)`
  );
  yield put(updateCart(updatedCart));
}

function* handleRemovingItemFromCart({ payload: item }) {
  const cart = yield select(selectShoppingCart);
  const currentUser = yield select(selectCurrentUser);

  const updatedCart = yield removeFromCart(cart, item, !!currentUser);
  yield createSuccessNotification("Removed From Cart", item.name);
  yield put(updateCart(updatedCart));
}

function* handleUpdatingItemQuantity({ payload: { item, newQuantity } }) {
  const cart = yield select(selectShoppingCart);
  const currentUser = yield select(selectCurrentUser);

  const updatedCart = yield changeItemQuantity(
    cart,
    { item, newQuantity },
    !!currentUser
  );
  yield put(updateCart(updatedCart));
}

function* saveCart({ payload: cartWithoutCartItemRefs }) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const cartId = yield select(selectCartId);
    if (currentUser && cartId) {
      yield saveCartToDb(cartWithoutCartItemRefs, cartId);
    }
  } catch (e) {}
}

function* handleLogOutSuccess() {
  yield put(clearCart());
  yield createSuccessNotification("Log Out Successful", "See you next time!");
}

function* watchSuccessfulLogOut() {
  yield takeLatest(USER_ACTION_TYPES.LOG_OUT_SUCCESS, handleLogOutSuccess);
}

function* watchAddingToCart() {
  yield takeEvery(CART_ACTION_TYPES.START_ADD_TO_CART, handleAddingItemToCart);
}

function* watchRemovingFromCart() {
  yield takeEvery(
    CART_ACTION_TYPES.START_REMOVE_FROM_CART,
    handleRemovingItemFromCart
  );
}

function* watchUpdatingItemQuantity() {
  yield takeEvery(
    CART_ACTION_TYPES.START_CHANGE_QUANTITY,
    handleUpdatingItemQuantity
  );
}

function* watchCartUpdate() {
  yield takeLatest(CART_ACTION_TYPES.UPDATE_CART, saveCart);
}

export default function* cartSagas() {
  yield all([
    call(watchSuccessfulLogOut),
    call(watchAddingToCart),
    call(watchRemovingFromCart),
    call(watchUpdatingItemQuantity),
    call(watchCartUpdate)
  ]);
}
