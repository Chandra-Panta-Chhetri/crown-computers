import CHECKOUT_ACTION_TYPES from "./checkout.action.types";
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { checkoutFail, checkoutSuccess } from "./checkout.actions";
import { clearCart } from "../cart/cart.actions";
import { createNewSale } from "../../firebase-utils/firebase.checkout_utils";
import {
  selectShoppingCart,
  selectCartTotal,
  selectCartId
} from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import axios from "axios";
import {
  checkCartItemsInStockOrOutdated,
  updateProductStocksInCart
} from "../../firebase-utils/firebase.cart_utils";

function* processPayment(
  stripeInstance,
  cardElement,
  customerInfo,
  billingDetails,
  amountToBePaid
) {
  const { data: clientSecret } = yield axios.post("/api/payments", {
    amount: amountToBePaid * 100
  });
  const paymentMethodReq = yield stripeInstance.createPaymentMethod({
    type: "card",
    card: cardElement,
    billing_details: { ...customerInfo, address: { ...billingDetails } }
  });
  if (paymentMethodReq.error) {
    throw Error(paymentMethodReq.error.message);
  }
  const paymentMethod = paymentMethodReq.paymentMethod.card.brand;
  const { error } = yield stripeInstance.confirmCardPayment(clientSecret, {
    payment_method: paymentMethodReq.paymentMethod.id
  });
  if (error) {
    throw Error(error.message);
  }
  return paymentMethod;
}

function* checkoutCart({
  payload: {
    stripeInstance,
    cardElement,
    customerInfo,
    billingDetails,
    shippingDetails,
    onSuccessfulCheckout,
    price
  }
}) {
  try {
    const shoppingCart = yield select(selectShoppingCart);
    yield checkCartItemsInStockOrOutdated(shoppingCart);
    const paymentMethod = yield call(
      processPayment,
      stripeInstance,
      cardElement,
      customerInfo,
      billingDetails,
      price
    );
    yield updateProductStocksInCart(shoppingCart);
    yield put(
      checkoutSuccess(
        onSuccessfulCheckout,
        "Payment Successful",
        `${customerInfo.name.toUpperCase()} your payment was successful. Have a good day`,
        paymentMethod
      )
    );
  } catch (err) {
    yield put(checkoutFail(err.message));
  }
}

function* handleCheckoutSuccess({
  payload: {
    onSuccessfulCheckout,
    notificationTitle,
    notificationMsg,
    paymentMethod
  }
}) {
  try {
    const shoppingCart = yield select(selectShoppingCart);
    const shoppingCartSubtotal = yield select(selectCartTotal);
    const currentUser = yield select(selectCurrentUser);
    const cartId = yield select(selectCartId);
    yield put(addSuccessNotification(notificationTitle, notificationMsg));
    yield put(clearCart());
    yield onSuccessfulCheckout();
    yield createNewSale(
      shoppingCart,
      paymentMethod,
      shoppingCartSubtotal,
      !!currentUser,
      cartId
    );
  } catch (err) {}
}

function* handleCheckoutFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Checkout Failed", errorMsg));
}

function* watchCheckoutStart() {
  yield takeLatest(CHECKOUT_ACTION_TYPES.START_CHECKOUT, checkoutCart);
}

function* watchCheckoutSuccess() {
  yield takeLatest(
    CHECKOUT_ACTION_TYPES.CHECKOUT_SUCCESS,
    handleCheckoutSuccess
  );
}

function* watchCheckoutFail() {
  yield takeLatest(CHECKOUT_ACTION_TYPES.CHECKOUT_FAIL, handleCheckoutFail);
}

export default function* checkoutSagas() {
  yield all([
    call(watchCheckoutStart),
    call(watchCheckoutSuccess),
    call(watchCheckoutFail)
  ]);
}
