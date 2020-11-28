import React from "react";
import { SameAsBillingCheckbox } from "./billing-details.styles";
import {
  FormTitle,
  FormContainer,
  ContinueButton,
  FormButtonsContainer,
  BackButton
} from "../checkout-form/checkout-form.styles";

import FormInput from "../form-input/form-input.component";

const BillingDetailsForm = ({
  prevStep,
  nextStep,
  handleChange,
  formValues,
  formType,
  formLabel,
  sameAsBilling = false
}) => {
  const continueToNextStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <FormContainer onSubmit={continueToNextStep}>
      <FormTitle isShipping={formType === "shippingDetails"}>
        {formLabel}
      </FormTitle>
      {formType === "shippingDetails" && (
        <SameAsBillingCheckbox
          label="Same As Billing"
          name="sameAsBilling"
          inputChangeHandler={handleChange}
          checkedStatus={sameAsBilling}
        />
      )}
      <FormInput
        label="Street*"
        name="line1"
        inputChangeHandler={handleChange}
        inputValue={formValues.line1}
        required
        placeholder="123 Kingston Rd"
      />
      <FormInput
        label="City*"
        name="city"
        inputChangeHandler={handleChange}
        inputValue={formValues.city}
        required
        placeholder="toronto"
      />
      <FormInput label="Country*" name="country" inputValue="Canada" readOnly />
      <FormInput
        label="Postal Code*"
        name="postal_code"
        pattern="^([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)$"
        title="A1A 2A3 or A1A2A3"
        inputChangeHandler={handleChange}
        inputValue={formValues.postal_code}
        required
        uppercaseInput
        placeholder="A1A2A3"
      />
      <FormButtonsContainer>
        <BackButton onClick={prevStep} type="button">
          Back
        </BackButton>
        <ContinueButton type="submit">Continue</ContinueButton>
      </FormButtonsContainer>
    </FormContainer>
  );
};

export default BillingDetailsForm;
