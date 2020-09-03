import React from "react";
import {
  OrderSummaryContainer,
  Heading,
  PriceSummaryContainer,
  Price
} from "./order-summary.styles";

import StripeCheckoutButton from "../stripe-checkout-button/stripe-checkout-button.component";

const TAX_RATE = 0.13;

const OrderSummary = ({ cartTotal }) => {
  const subTotal = Math.round(cartTotal * 100) / 100;
  const totalTax = Math.round(cartTotal * TAX_RATE * 100) / 100;
  const total = subTotal + totalTax;
  return (
    <OrderSummaryContainer>
      <Heading>Order Summary</Heading>
      <PriceSummaryContainer>
        <div>
          Subtotal <Price>${subTotal}</Price>
        </div>
        <div>
          Total Tax <Price>${totalTax}</Price>
        </div>
        <div>
          Total <Price>${total}</Price>
        </div>
      </PriceSummaryContainer>
      <StripeCheckoutButton price={total} label="Proceed To Checkout" />
    </OrderSummaryContainer>
  );
};

export default OrderSummary;
