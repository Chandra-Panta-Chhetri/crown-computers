import { createSelector } from "reselect";

export const selectCheckout = (state) => state.checkout;

export const selectIsCheckingOut = createSelector(
  [selectCheckout],
  (checkout) => checkout.isCheckingOut
);
