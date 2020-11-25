import React, { useState } from "react";
import {
  FormTitle,
  FormContainer,
  FormButtonsContainer,
  BackButton,
  ContinueButton as PayNowButton
} from "../checkout-form/checkout-form.styles";
import {
  CardElementContainer,
  cardElementStyles
} from "./card-details-form.styles";

import { CardElement } from "@stripe/react-stripe-js";

import { addInfoNotification } from "../../redux/notification/notification.actions";
import { connect } from "react-redux";

const cardElementOptions = {
  iconStyle: "solid",
  style: cardElementStyles,
  hidePostalCode: true
};

const CardDetailsForm = ({
  prevStep,
  handleSubmit,
  amountToBePaid,
  displayInfoNotification,
  stripeLoaded
}) => {
  const [isCardDetailFilled, setIsCardDetailFilled] = useState(false);
  const handleCardDetailsChange = (e) => {
    setIsCardDetailFilled(e.complete);
    if (e.error) {
      displayInfoNotification("Issue With Card Details", e.error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Card Details</FormTitle>
      <CardElementContainer>
        <CardElement
          options={cardElementOptions}
          onChange={handleCardDetailsChange}
        />
      </CardElementContainer>
      <FormButtonsContainer>
        <BackButton onClick={prevStep} type="button">
          Back
        </BackButton>
        <PayNowButton
          type="submit"
          disabled={!stripeLoaded || !isCardDetailFilled}
        >
          Confirm & Pay ${amountToBePaid}
        </PayNowButton>
      </FormButtonsContainer>
    </FormContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg))
});

export default connect(null, mapDispatchToProps)(CardDetailsForm);
