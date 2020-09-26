import React from "react";
import {
  SubHeading,
  FormContainer,
  ContinueButton
} from "../checkout-form/checkout-form.styles";

import FormInput from "../form-input/form-input.component";

const CustomerInfoForm = ({ nextStep, handleChange, formValues }) => {
  const continueToNextStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <FormContainer onSubmit={continueToNextStep}>
      <SubHeading>Customer Info</SubHeading>
      <FormInput
        label="Name"
        name="name"
        inputChangeHandler={handleChange("customerInfo")}
        inputValue={formValues.name}
        required
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        inputChangeHandler={handleChange("customerInfo")}
        inputValue={formValues.email}
        required
      />
      <FormInput
        label="Phone Number"
        name="phone"
        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
        title="123-456-7890 or 123 456 7890"
        inputChangeHandler={handleChange("customerInfo")}
        inputValue={formValues.phone}
        required
      />
      <ContinueButton type="submit">Continue</ContinueButton>
    </FormContainer>
  );
};

export default CustomerInfoForm;
