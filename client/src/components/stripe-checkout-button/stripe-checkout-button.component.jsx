import React from "react";

import StripeCheckout from "react-stripe-checkout";
import Button from "../button/button.component";

import axios from "axios";

const StripeCheckOutButton = ({ price, label }) => {
  const priceInCents = price * 100;

  const onToken = async (stripeToken) => {
    try {
      stripeToken.amount = priceInCents;
      const response = await axios.post("/checkout", stripeToken);
      alert(response.data.success);
    } catch (e) {
      alert(`Payment failed. Please try again! ${e.response.data.msg}`);
    }
  };

  return (
    <StripeCheckout
      name="Crown Computers"
      amount={priceInCents}
      currency="CAD"
      email="chandra.panta345@hotmail.com"
      shippingAddress
      billingAddress={true}
      token={onToken}
      stripeKey="pk_test_51H2dKlGzDF5ZEPUIwxzCtFWIicqIlBU4ZJJ09f6XxAZX7O3spzP8FJrjZrB5Ey2VjY7oNZy3byehChIfHcOzjEpv002BfotJtp"
    >
      <Button>{label}</Button>
    </StripeCheckout>
  );
};

//For testing 4242424242424242

export default StripeCheckOutButton;
