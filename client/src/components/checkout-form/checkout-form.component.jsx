import React, { useState } from "react";
import {
  CheckoutFormContainer,
  PayNowButton,
  SubHeading,
  cardElementStyles,
  CardElementContainer,
  ErrorText
} from "./checkout-form.styles";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "../form-input/form-input.component";

import axios from "axios";

const cardElementOptions = {
  iconStyle: "solid",
  style: cardElementStyles,
  hidePostalCode: true
};

const CheckoutForm = ({ price }) => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [billingDetails, setBillingDetails] = useState({
    city: "",
    postal_code: "",
    line1: "",
    country: "CA"
  });
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsPaymentProcessing(true);
    const cardElement = elements.getElement("card");
    console.log(cardElement);
    try {
      const { data: clientSecret } = await axios.post("/api/payments", {
        amount: price * 100
      });
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { ...customerInfo, address: { ...billingDetails } }
      });
      if (paymentMethodReq.error) {
        throw Error(paymentMethodReq.error.message);
      }
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      if (error) {
        throw Error(error.message);
      }
    } catch (err) {
      setPaymentError(err.message);
    }
    setIsPaymentProcessing(false);
  };

  const handleBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleCustomerDetailsChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCardDetailsChange = (e) => {
    e.error ? setPaymentError(e.error.message) : setPaymentError();
  };

  return (
    <CheckoutFormContainer onSubmit={handlePayment}>
      <SubHeading>Customer Info</SubHeading>
      <FormInput
        label="Name"
        name="name"
        inputChangeHandler={handleCustomerDetailsChange}
        inputValue={customerInfo.name}
        required
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        inputChangeHandler={handleCustomerDetailsChange}
        inputValue={customerInfo.email}
        required
      />
      <FormInput
        label="Phone Number"
        name="phone"
        type="tel"
        inputChangeHandler={handleCustomerDetailsChange}
        inputValue={customerInfo.phone}
        required
      />
      <SubHeading>Billing & Shipping Details</SubHeading>
      <FormInput
        label="Street"
        name="line1"
        inputChangeHandler={handleBillingDetailsChange}
        inputValue={billingDetails.line1}
        required
      />
      <FormInput
        label="City"
        name="city"
        inputChangeHandler={handleBillingDetailsChange}
        inputValue={billingDetails.city}
        required
      />
      <FormInput label="Country" name="country" inputValue="Canada" readOnly />
      <FormInput
        label="Postal Code"
        name="postal_code"
        inputChangeHandler={handleBillingDetailsChange}
        inputValue={billingDetails.postal_code}
        required
      />
      <SubHeading>Payment Details</SubHeading>
      <CardElementContainer>
        <CardElement
          options={cardElementOptions}
          onChange={handleCardDetailsChange}
        />
      </CardElementContainer>
      {paymentError ? <ErrorText>{paymentError}</ErrorText> : null}
      <PayNowButton type="submit" disabled={isPaymentProcessing || !stripe}>
        {isPaymentProcessing ? "Processing Payment..." : `Pay $${price}`}
      </PayNowButton>
    </CheckoutFormContainer>
  );
};

export default CheckoutForm;
