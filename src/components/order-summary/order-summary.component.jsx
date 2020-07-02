import React from "react";
import "./order-summary.styles.scss";

import { Button } from "../button/button.component";

export const OrderSummary = ({ cartTotal }) => (
  <article className="order-summary">
    <h2 className="order-summary-heading">Order Summary</h2>
    <section className="price-breakdown">
      <div>
        Subtotal <span>${Math.round(cartTotal * 100) / 100}</span>
      </div>
      <div>
        Total Tax <span>${Math.round(cartTotal * 0.13 * 100) / 100}</span>
      </div>
      <div>
        Total <span>${Math.round(cartTotal * 1.13 * 100) / 100}</span>
      </div>
    </section>
    <Button>Checkout</Button>
  </article>
);
