import React, { useState } from "react";
import {
  FormTitle,
  FormContainer,
  FormButtonsContainer,
  BackButton,
  ContinueButton as PayNowButton
} from "../checkout-form/checkout-form.styles";
import { CardElementContainer } from "./card-details-form.styles";

import { CardElement } from "@stripe/react-stripe-js";

import { addInfoNotification } from "../../redux/notification/notification.actions";
import { connect } from "react-redux";
import {
  selectThemeName,
  selectThemeStyles
} from "../../redux/theme/theme.selectors";

const CardDetailsForm = ({
  prevStep,
  handleSubmit,
  amountToBePaid,
  displayInfoNotification,
  stripeLoaded,
  theme,
  themeName
}) => {
  const [isCardDetailFilled, setIsCardDetailFilled] = useState(false);
  const cardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        color: theme.textColor,
        fontSize: "17px",
        iconColor: theme.textColor,
        "::placeholder": {
          color: theme.textColor
        },
        backgroundColor: "transparent"
      },
      invalid: {
        iconColor: "red",
        color: "red"
      },
      complete: {
        iconColor: theme.textColor
      }
    },
    hidePostalCode: true
  };
  const handleCardDetailsChange = (e) => {
    setIsCardDetailFilled(e.complete);
    if (e.error) {
      displayInfoNotification("Issue With Card Details", e.error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Card Details</FormTitle>
      <CardElementContainer isDarkMode={themeName === "dark"}>
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

const mapStateToProps = (state) => ({
  theme: selectThemeStyles(state),
  themeName: selectThemeName(state)
});

const mapDispatchToProps = (dispatch) => ({
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsForm);
