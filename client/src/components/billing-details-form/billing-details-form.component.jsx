import React from "react";
import {
  SubHeading,
  FormContainer,
  ContinueButton
} from "../checkout-form/checkout-form.styles";

import Button from "../button/button.component";
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
      <SubHeading>{formLabel}</SubHeading>
      {formType === "shippingDetails" && (
        <div>
          <input
            type="checkbox"
            value="sameAsBilling"
            name="sameAsBilling"
            onChange={handleChange(formType)}
            checked={sameAsBilling}
          />
          <label htmlFor="sameAsBilling">Same As Billing Info</label>
        </div>
      )}
      <FormInput
        label="Street"
        name="line1"
        inputChangeHandler={handleChange(formType)}
        inputValue={formValues.line1}
        required
      />
      <FormInput
        label="City"
        name="city"
        inputChangeHandler={handleChange(formType)}
        inputValue={formValues.city}
        required
      />
      <FormInput label="Country" name="country" inputValue="Canada" readOnly />
      <FormInput
        label="Postal Code"
        name="postal_code"
        pattern="^([A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d)$"
        title="A1A 2A3 or A1A2A3"
        inputChangeHandler={handleChange(formType)}
        inputValue={formValues.postal_code}
        required
        uppercaseInput
      />
      <Button onClick={prevStep} type="button">
        Back
      </Button>
      <ContinueButton type="submit">Continue</ContinueButton>
    </FormContainer>
  );
};

export default BillingDetailsForm;
