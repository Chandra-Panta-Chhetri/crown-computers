import CHECKOUT_ACTION_TYPES from "./checkout.action.types";

export const startCheckout = (
  stripeInstance,
  cardElement,
  checkoutInfo,
  onSuccessfulCheckout,
  price
) => ({
  type: CHECKOUT_ACTION_TYPES.START_CHECKOUT,
  payload: {
    stripeInstance,
    cardElement,
    checkoutInfo,
    onSuccessfulCheckout,
    price
  }
});

export const checkoutSuccess = (
  onSuccessfulCheckout,
  notificationTitle,
  notificationMsg,
  paymentMethod
) => ({
  type: CHECKOUT_ACTION_TYPES.CHECKOUT_SUCCESS,
  payload: {
    onSuccessfulCheckout,
    notificationTitle,
    notificationMsg,
    paymentMethod
  }
});

export const checkoutFail = (errorMsg) => ({
  type: CHECKOUT_ACTION_TYPES.CHECKOUT_FAIL,
  payload: errorMsg
});
