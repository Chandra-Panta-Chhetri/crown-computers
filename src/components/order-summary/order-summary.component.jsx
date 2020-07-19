import React from "react";
import {
  OrderSummaryContainer,
  Heading,
  PriceSummaryContainer,
  Price
} from "./order-summary.styles";

import StripeCheckOutButton from "../stripe-checkout-button/stripe-checkout-button.component";

const OrderSummary = ({ cartTotal }) => {
  const subtotal = Math.round(cartTotal * 100) / 100;
  const totalTax = Math.round(cartTotal * 0.13 * 100) / 100;
  const total = Math.round(cartTotal * 1.13 * 100) / 100;
  return (
    <OrderSummaryContainer>
      <Heading>Order Summary</Heading>
      <PriceSummaryContainer>
        <div>
          Subtotal <Price>${subtotal}</Price>
        </div>
        <div>
          Total Tax <Price>${totalTax}</Price>
        </div>
        <div>
          Total <Price>${total}</Price>
        </div>
      </PriceSummaryContainer>
      <StripeCheckOutButton price={total} label="Pay Now" />
    </OrderSummaryContainer>
  );
};

export default OrderSummary;
