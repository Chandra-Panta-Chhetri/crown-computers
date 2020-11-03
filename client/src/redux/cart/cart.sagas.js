import CART_ACTION_TYPES from "./cart.action.types";
import {
  takeLatest,
  takeEvery,
  put,
  call,
  all,
  select,
  actionChannel,
  take
} from "redux-saga/effects";
import { updateCartSuccess, updateCartFail } from "./cart.actions";
import { saveCartItems } from "../../firebase-utils/firebase.cart_utils";
import { selectShoppingCart, selectCartId } from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { addToCart, changeItemQuantity, removeFromCart } from "./cart.utils";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { truncate } from "../../global.utils";

function* addItemToCart({ payload: { item } }) {
  try {
    const cart = yield select(selectShoppingCart);
    const currentUser = yield select(selectCurrentUser);
    const updatedCart = yield addToCart(cart, item, !!currentUser);
    yield put(
      updateCartSuccess(
        updatedCart,
        "Added To Cart",
        `${truncate(item.name)} ($${item.price} ea.)`
      )
    );
  } catch (err) {
    yield put(
      updateCartFail(
        "Adding To Cart Failed",
        `Not enough ${truncate(item.name)} in stock.`
      )
    );
  }
}

function* removeItemFromCart({ payload: { item } }) {
  const { name } = yield item;
  try {
    const cart = yield select(selectShoppingCart);
    const currentUser = yield select(selectCurrentUser);
    const updatedCart = yield removeFromCart(cart, item, !!currentUser);
    yield put(
      updateCartSuccess(updatedCart, "Removed From Cart", truncate(name))
    );
  } catch (err) {
    yield put(
      updateCartFail(
        "Removing Item Failed",
        `There was a problem removing ${truncate(name)} from the cart`
      )
    );
  }
}

function* updateItemQuantity({ payload: { item, newQuantity } }) {
  try {
    const cart = yield select(selectShoppingCart);
    const currentUser = yield select(selectCurrentUser);
    const updatedCart = yield changeItemQuantity(
      cart,
      { item, newQuantity },
      !!currentUser
    );
    yield put(
      updateCartSuccess(
        updatedCart,
        "Updated Item Quantity",
        truncate(item.name)
      )
    );
  } catch (err) {
    yield put(
      updateCartFail(
        `Increasing Quantity Failed`,
        `Cannot add anymore ${truncate(item.name)}. Not enough in stock`
      )
    );
  }
}

function* handleCartUpdateSuccess({
  payload: { cart: cartWithoutCartItemRefs, successTitle, successMsg }
}) {
  try {
    yield put(addSuccessNotification(successTitle, successMsg));
    const currentUser = yield select(selectCurrentUser);
    const cartId = yield select(selectCartId);
    if (currentUser && !currentUser.isAdmin && cartId) {
      yield saveCartItems(cartWithoutCartItemRefs, cartId);
    }
  } catch (err) {
    yield put(
      addErrorNotification(
        "Saving Cart Failed",
        "There was a problem saving your cart"
      )
    );
  }
}

function* watchAddingToCart() {
  const channel = yield actionChannel(CART_ACTION_TYPES.START_ADD_TO_CART);
  while (true) {
    const action = yield take(channel);
    yield call(addItemToCart, action);
  }
}

function* watchRemovingFromCart() {
  yield takeEvery(CART_ACTION_TYPES.START_REMOVE_FROM_CART, removeItemFromCart);
}

function* watchUpdatingItemQuantity() {
  yield takeEvery(CART_ACTION_TYPES.START_CHANGE_QUANTITY, updateItemQuantity);
}

function* watchCartUpdateSuccess() {
  yield takeLatest(
    CART_ACTION_TYPES.UPDATE_CART_SUCCESS,
    handleCartUpdateSuccess
  );
}

export default function* cartSagas() {
  yield all([
    call(watchAddingToCart),
    call(watchRemovingFromCart),
    call(watchUpdatingItemQuantity),
    call(watchCartUpdateSuccess)
  ]);
}
