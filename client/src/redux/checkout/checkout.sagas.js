import CHECKOUT_ACTION_TYPES from "./checkout.action.types";
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { checkoutFail, checkoutSuccess } from "./checkout.actions";
import { clearCart } from "../cart/cart.actions";

import axios from "axios";

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
    const { data: clientSecret } = yield axios.post("/api/payments", {
      amount: price * 100
    });
    const paymentMethodReq = yield stripeInstance.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { ...customerInfo, address: { ...billingDetails } }
    });
    if (paymentMethodReq.error) {
      throw Error(paymentMethodReq.error.message);
    }
    const { error } = yield stripeInstance.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id
    });
    if (error) {
      throw Error(error.message);
    }
    yield put(
      checkoutSuccess(
        onSuccessfulCheckout,
        "Payment Successful",
        `${customerInfo.name} your payment was successful. Have a good day`
      )
    );
  } catch (err) {
    yield put(checkoutFail(err.message));
  }
}

function* handleCheckoutSuccess({
  payload: { onSuccessfulCheckout, successTitle, successMsg }
}) {
  try {
    yield put(addSuccessNotification(successTitle, successMsg));
    yield put(clearCart());
    yield onSuccessfulCheckout();
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
