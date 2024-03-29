import CHECKOUT_ACTION_TYPES from "./checkout.action.types";
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { addSuccessNotification } from "../notification/notification.actions";
import { checkoutFail, checkoutSuccess } from "./checkout.actions";
import { clearCart } from "../cart/cart.actions";
import { createNewSale } from "../../firebase-utils/firebase.sale_utils";
import {
  selectShoppingCart,
  selectCartTotal,
  selectCartId,
  selectNumCartItems
} from "../cart/cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import axios from "axios";
import {
  checkCartItemsInStockOrOutdated,
  updateProductStocksInCart
} from "../../firebase-utils/firebase.cart_utils";
import { analytics } from "../../firebase-utils/firebase.config";

function* processPayment(
  stripeInstance,
  cardElement,
  { customerInfo, billingDetails },
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
  const paymentMethod = yield paymentMethodReq.paymentMethod.card.brand;
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
    checkoutInfo,
    onSuccessfulCheckout,
    price
  }
}) {
  try {
    yield analytics.logEvent("checkout_start", { checkoutInfo, price });
    const shoppingCart = yield select(selectShoppingCart);
    const { customerInfo } = yield checkoutInfo;
    yield checkCartItemsInStockOrOutdated(shoppingCart);
    const paymentMethod = yield call(
      processPayment,
      stripeInstance,
      cardElement,
      checkoutInfo,
      price
    );
    yield updateProductStocksInCart(shoppingCart);
    yield put(
      checkoutSuccess(
        onSuccessfulCheckout,
        "Payment Approved",
        "Payment was successful. Have a good day!",
        paymentMethod,
        customerInfo
      )
    );
  } catch (err) {
    yield analytics.logEvent("checkout_fail", {
      err: err.message,
      checkoutInfo,
      price
    });
    yield put(checkoutFail(err.message));
  }
}

function* handleCheckoutSuccess({
  payload: {
    onSuccessfulCheckout,
    successTitle,
    successMsg,
    paymentMethod,
    customerInfo
  }
}) {
  try {
    yield analytics.logEvent("checkout_success", {
      paymentMethod,
      customerInfo
    });
    const shoppingCart = yield select(selectShoppingCart);
    const shoppingCartSubtotal = yield select(selectCartTotal);
    const numItemsSold = yield select(selectNumCartItems);
    const currentUser = yield select(selectCurrentUser);
    const cartId = yield select(selectCartId);
    yield put(addSuccessNotification(successTitle, successMsg));
    yield put(clearCart());
    yield onSuccessfulCheckout();
    yield createNewSale(
      shoppingCart,
      paymentMethod,
      shoppingCartSubtotal,
      customerInfo,
      !!currentUser,
      cartId,
      numItemsSold
    );
    yield analytics.logEvent("sale_created", {
      paymentMethod,
      customerInfo,
      shoppingCartSubtotal,
      numItemsSold
    });
  } catch (err) {
    yield analytics.logEvent("sale_failed_to_create", { err: err.message });
  }
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

export default function* checkoutSagas() {
  yield all([call(watchCheckoutStart), call(watchCheckoutSuccess)]);
}
