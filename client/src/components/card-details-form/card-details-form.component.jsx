import React, { useState } from "react";
import {
  SubHeading,
  FormContainer
} from "../checkout-form/checkout-form.styles";
import {
  CardElementContainer,
  cardElementStyles,
  PayNowButton,
  LoadingText
} from "./card-details-form.styles";

import Button from "../button/button.component";
import { CardElement } from "@stripe/react-stripe-js";

import { addInfoNotification } from "../../redux/notification/notification.actions";
import { selectIsCheckingOut } from "../../redux/checkout/checkout.selectors";
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
  isCheckingOut,
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
      <SubHeading>Card Details</SubHeading>
      <CardElementContainer>
        <CardElement
          options={cardElementOptions}
          onChange={handleCardDetailsChange}
        />
      </CardElementContainer>
      <Button onClick={prevStep} type="button">
        Back
      </Button>
      <PayNowButton
        type="submit"
        disabled={isCheckingOut || !stripeLoaded || !isCardDetailFilled}
      >
        {isCheckingOut ? (
          <LoadingText>Processing Payment. Please wait</LoadingText>
        ) : (
          `Confirm & Pay $${amountToBePaid}`
        )}
      </PayNowButton>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  isCheckingOut: selectIsCheckingOut(state)
});

const mapDispatchToProps = (dispatch) => ({
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsForm);
