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
import { clearCart, updateCartSuccess, updateCartFail } from "./cart.actions";
import { saveCart } from "../../utils/firebase.cart_utils";
import { selectShoppingCart, selectCartId } from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { addToCart, changeItemQuantity, removeFromCart } from "./cart.utils";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";

function* handleAddingItemToCart({ payload: { item } }) {
  try {
    const cart = yield select(selectShoppingCart);
    const currentUser = yield select(selectCurrentUser);
    const updatedCart = yield addToCart(cart, item, !!currentUser);
    yield put(
      updateCartSuccess(
        updatedCart,
        "Added To Cart",
        `${item.name} ($${item.price} ea.)`
      )
    );
  } catch (err) {
    yield put(
      updateCartFail(
        "Adding To Cart Failed",
        `Not enough ${item.name} in stock`
      )
    );
  }
}

function* handleRemovingItemFromCart({ payload: { item } }) {
  const cart = yield select(selectShoppingCart);
  const currentUser = yield select(selectCurrentUser);
  const updatedCart = yield removeFromCart(cart, item, !!currentUser);
  yield put(updateCartSuccess(updatedCart, "Removed From Cart", item.name));
}

function* handleUpdatingItemQuantity({ payload: { item, newQuantity } }) {
  try {
    const cart = yield select(selectShoppingCart);
    const currentUser = yield select(selectCurrentUser);
    const updatedCart = yield changeItemQuantity(
      cart,
      { item, newQuantity },
      !!currentUser
    );
    yield put(
      updateCartSuccess(updatedCart, "Updated Item Quantity", item.name)
    );
  } catch (err) {
    yield put(
      updateCartFail(
        `Increasing Quantity Failed`,
        `Cannot add anymore ${item.name}. Not enough in stock`
      )
    );
  }
}

function* handleCartUpdateSuccess({
  payload: { cart: cartWithoutCartItemRefs, notificationTitle, notificationMsg }
}) {
  try {
    yield put(addSuccessNotification(notificationTitle, notificationMsg));
    const currentUser = yield select(selectCurrentUser);
    const cartId = yield select(selectCartId);
    if (currentUser && cartId) {
      yield saveCart(cartWithoutCartItemRefs, cartId);
    }
  } catch (err) {}
}

function* handleCartUpdateFail({ payload: { errorMsg, errorTitle } }) {
  yield put(addErrorNotification(errorTitle, errorMsg));
}

function* handleLogOutSuccess() {
  yield put(clearCart());
  yield put(addSuccessNotification("Log Out Successful", "See you next time!"));
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

function* watchCartUpdateSuccess() {
  yield takeLatest(
    CART_ACTION_TYPES.UPDATE_CART_SUCCESS,
    handleCartUpdateSuccess
  );
}

function* watchCartUpdateFail() {
  yield takeLatest(CART_ACTION_TYPES.UPDATE_CART_FAIL, handleCartUpdateFail);
}

export default function* cartSagas() {
  yield all([
    call(watchSuccessfulLogOut),
    call(watchAddingToCart),
    call(watchRemovingFromCart),
    call(watchUpdatingItemQuantity),
    call(watchCartUpdateSuccess),
    call(watchCartUpdateFail)
  ]);
}
