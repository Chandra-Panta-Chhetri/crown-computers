import React, { useState } from "react";

import { useStripe, useElements } from "@stripe/react-stripe-js";

import CustomerInfo from "../customer-info-form/customer-info-form.component";
import BillingDetails from "../billing-details-form/billing-details-form.component";
import CardDetails from "../card-details-form/card-details-form.component";

import { startCheckout } from "../../redux/checkout/checkout.actions";
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
    }
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (formLabel) => (event) => {
    const { value, name } = event.target;
    setCheckoutFormData((prevFormData) => {
      prevFormData[formLabel][name] = value;
      return { ...prevFormData };
    });
  };

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");
    console.log(checkoutFormData);
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
          nextStep={nextStep}
          handleChange={handleChange}
          formValues={checkoutFormData.customerInfo}
        />
      );
    case 2:
      return (
        <BillingDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          formValues={checkoutFormData.billingDetails}
        />
      );
    // case 3:
    //   return (
    //     <ShippingDetails
    //       prevStep={prevStep}
    //       nextStep={nextStep}
    //       handleChange={handleChange}
    //       formValues={checkoutFormData.shippingDetails}
    //     />
    //   );
    case 3:
      return (
        <CardDetails
          prevStep={prevStep}
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
