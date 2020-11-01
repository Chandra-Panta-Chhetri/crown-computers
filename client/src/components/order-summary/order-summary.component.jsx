import React from "react";
import {
  OrderSummaryContainer,
  Heading,
  PriceSummaryContainer,
  Price,
  PriceSummaryItem
} from "./order-summary.styles";

import StripeCheckoutButton from "../stripe-checkout-button/stripe-checkout-button.component";

import { roundNumber } from "../../global.utils";

const TAX_RATE = 0.13;

const OrderSummary = ({ cartTotal }) => {
  const subTotal = roundNumber(cartTotal);
  const totalTax = roundNumber(subTotal * TAX_RATE);
  const total = roundNumber(subTotal + totalTax);
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
