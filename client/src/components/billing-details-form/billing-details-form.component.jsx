import React from "react";
import {
  FormTitle,
  FormContainer,
  ContinueButton
} from "../checkout-form/checkout-form.styles";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import Checkbox from "../checkbox/checkbox.component";

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
      <FormTitle>{formLabel}</FormTitle>
      {formType === "shippingDetails" && (
        <Checkbox
          label="Same As Billing Info"
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
      <Button onClick={prevStep} type="button">
        Back
      </Button>
      <ContinueButton type="submit">Continue</ContinueButton>
    </FormContainer>
  );
};

export default BillingDetailsForm;
