import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;

export const selectIsCheckingOut = createSelector(
  [selectCheckout],
  (checkout) => checkout.isCheckingOut
);

export const selectCheckoutLoadingText = createSelector(
  [selectCheckout],
  (checkout) => checkout.loadingText
);
