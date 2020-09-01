import React, { useState } from "react";
import {
  CheckoutFormContainer,
  PayNowButton,
  SubHeading,
  cardElementStyles,
  CardElementContainer,
  LoadingText
} from "./checkout-form.styles";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import FormInput from "../form-input/form-input.component";

import { startCheckout } from "../../redux/checkout/checkout.actions";
import { connect } from "react-redux";
import { addInfoNotification } from "../../redux/notification/notification.actions";
import { selectIsCheckingOut } from "../../redux/checkout/checkout.selectors";

const cardElementOptions = {
  iconStyle: "solid",
  style: cardElementStyles,
  hidePostalCode: true
};

const CheckoutForm = ({
  price,
  startCheckout,
  onSuccessfulCheckout,
  displayInfoNotification,
  isCheckingOut
}) => {
  const [isCardDetailFilled, setIsCardDetailFilled] = useState(false);
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");
    startCheckout(
      stripe,
      cardElement,
      customerInfo,
      billingDetails,
      {},
      onSuccessfulCheckout,
      price
    );
  };

  const handleBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleCustomerDetailsChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCardDetailsChange = (e) => {
    setIsCardDetailFilled(e.complete);
    if (e.error) {
      displayInfoNotification("Issue With Card Details", e.error.message);
    }
  };

  return (
    <CheckoutFormContainer onSubmit={handleCheckout}>
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
        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
        title="123-456-7890 or 123 456 7890"
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
        pattern="^([A-Z]\d[A-Z] ?\d[A-Z]\d)$"
        title="A1A 2A3 or A1A2A3"
        inputChangeHandler={handleBillingDetailsChange}
        inputValue={billingDetails.postal_code}
        required
        uppercaseInput
      />
      <SubHeading>Payment Details</SubHeading>
      <CardElementContainer>
        <CardElement
          options={cardElementOptions}
          onChange={handleCardDetailsChange}
        />
      </CardElementContainer>
      <PayNowButton
        type="submit"
        disabled={isCheckingOut || !stripe || !isCardDetailFilled}
      >
        {isCheckingOut ? (
          <LoadingText>Processing Payment</LoadingText>
        ) : (
          `Pay $${price}`
        )}
      </PayNowButton>
    </CheckoutFormContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg)),
  startCheckout: (
    stripeInstance,
    cardElement,
    customerInfo,
    billingDetails,
    shippingDetails,
    onSuccessfulCheckout,
    price
  ) =>
    dispatch(
      startCheckout(
        stripeInstance,
        cardElement,
        customerInfo,
        billingDetails,
        shippingDetails,
        onSuccessfulCheckout,
        price
      )
    )
});

const mapStateToProps = (state) => ({
  isCheckingOut: selectIsCheckingOut(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
