import React from "react";
import "./order-summary.styles.scss";

import StripeCheckoutButton from "../stripe-checkout-button/stripe-checkout-button.component";

export const OrderSummary = ({ cartTotal }) => {
  const subtotal = Math.round(cartTotal * 100) / 100;
  const totalTax = Math.round(cartTotal * 0.13 * 100) / 100;
  const total = Math.round(cartTotal * 1.13 * 100) / 100;
  return (
    <article className="order-summary">
      <h2 className="order-summary-heading">Order Summary</h2>
      <section className="price-breakdown">
        <div>
          Subtotal <span>${subtotal}</span>
        </div>
        <div>
          Total Tax <span>${totalTax}</span>
        </div>
        <div>
          Total <span>${total}</span>
        </div>
      </section>
      <StripeCheckoutButton price={total} label="Pay Now" />
    </article>
  );
};
