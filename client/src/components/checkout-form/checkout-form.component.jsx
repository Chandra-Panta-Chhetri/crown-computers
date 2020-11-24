import React, { useState } from "react";

import CustomerInfo from "../customer-info-form/customer-info-form.component";
import BillingDetails from "../billing-details-form/billing-details-form.component";
import CardDetails from "../card-details-form/card-details-form.component";

import { startCheckout } from "../../redux/checkout/checkout.actions";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";

const CheckoutForm = ({
  amountToBePaid,
  startCheckout,
  onSuccessfulCheckout
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [checkoutFormData, setCheckoutFormData] = useState({
    customerInfo: {
      name: "",
      email: "",
      phone: ""
    },
    billingDetails: {
      city: "",
      postal_code: "",
      line1: "",
      country: "CA"
    },
    shippingDetails: {
      city: "",
      postal_code: "",
      line1: "",
      country: "CA"
    },
    shippingSameAsBilling: false
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (formLabel) => (event) => {
    const { value, name, checked } = event.target;
    if (checked && name === "sameAsBilling") {
      return setCheckoutFormData((prevFormData) => {
        prevFormData.shippingDetails = { ...prevFormData.billingDetails };
        prevFormData.shippingSameAsBilling = checked;
        return { ...prevFormData };
      });
    }
    setCheckoutFormData((prevFormData) => {
      prevFormData[formLabel][name] = value;
      if (formLabel === "shippingDetails") {
        prevFormData.shippingSameAsBilling = false;
      }
      return { ...prevFormData };
    });
  };

  const changeStep = (incrementValue) => () =>
    setActiveStep((prevActiveStep) => prevActiveStep + incrementValue);

  const submitPayment = (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");
    startCheckout(
      stripe,
      cardElement,
      checkoutFormData,
      onSuccessfulCheckout,
      amountToBePaid
    );
  };

  switch (activeStep) {
    case 1:
      return (
        <CustomerInfo
          nextStep={changeStep(1)}
          handleChange={handleChange("customerInfo")}
          formValues={checkoutFormData.customerInfo}
        />
      );
    case 2:
      return (
        <BillingDetails
          prevStep={changeStep(-1)}
          nextStep={changeStep(1)}
          handleChange={handleChange("billingDetails")}
          formValues={checkoutFormData.billingDetails}
          formLabel="Billing Info"
          formType="billingDetails"
        />
      );
    case 3:
      return (
        <BillingDetails
          prevStep={changeStep(-1)}
          nextStep={changeStep(1)}
          handleChange={handleChange("shippingDetails")}
          formValues={checkoutFormData.shippingDetails}
          formLabel="Shipping Info"
          formType="shippingDetails"
          sameAsBilling={checkoutFormData.shippingSameAsBilling}
        />
      );
    case 4:
      return (
        <CardDetails
          prevStep={changeStep(-1)}
          handleSubmit={submitPayment}
          stripeLoaded={!!stripe}
          amountToBePaid={amountToBePaid}
        />
      );
    default:
      return null;
  }
};

const mapDispatchToProps = (dispatch) => ({
  startCheckout: (
    stripeInstance,
    cardElement,
    checkoutFormData,
    onSuccessfulCheckout,
    amountToBePaid
  ) =>
    dispatch(
      startCheckout(
        stripeInstance,
        cardElement,
        checkoutFormData,
        onSuccessfulCheckout,
        amountToBePaid
      )
    )
});

export default connect(null, mapDispatchToProps)(CheckoutForm);
