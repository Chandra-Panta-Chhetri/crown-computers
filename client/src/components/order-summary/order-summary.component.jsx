import React from "react";
import {
  OrderSummaryContainer,
  Heading,
  PriceSummaryContainer,
  Price,
  PriceSummaryItem
} from "./order-summary.styles";

import StripeCheckoutButton from "../stripe-checkout-button/stripe-checkout-button.component";

const TAX_RATE = 0.13;

const OrderSummary = ({ cartTotal }) => {
  const subTotal = Math.round(cartTotal * 100) / 100;
  const totalTax = Math.round(cartTotal * TAX_RATE * 100) / 100;
  const total = Math.round((subTotal + totalTax) * 100) / 100;
  return (
    <OrderSummaryContainer>
      <Heading>Order Summary</Heading>
      <PriceSummaryContainer>
        <PriceSummaryItem>
          Subtotal <Price>${subTotal}</Price>
        </PriceSummaryItem>
        <PriceSummaryItem>
          Tax <Price>${totalTax}</Price>
        </PriceSummaryItem>
        <PriceSummaryItem>
          Total <Price>${total}</Price>
        </PriceSummaryItem>
      </PriceSummaryContainer>
      <StripeCheckoutButton price={total} label="Proceed To Checkout" />
    </OrderSummaryContainer>
  );
};

export default OrderSummary;
