import React from "react";
import {
  FormTitle,
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
      <FormTitle>Customer Info</FormTitle>
      <FormInput
        label="Name*"
        name="name"
        inputChangeHandler={handleChange}
        inputValue={formValues.name}
        required
        placeholder="John Doe"
      />
      <FormInput
        label="Email*"
        name="email"
        type="email"
        inputChangeHandler={handleChange}
        inputValue={formValues.email}
        required
        placeholder="john.doe@gmail.com"
      />
      <FormInput
        label="Phone Number*"
        name="phone"
        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
        title="123-456-7890 or 123 456 7890"
        inputChangeHandler={handleChange}
        inputValue={formValues.phone}
        required
        placeholder="416-232-5432"
      />
      <ContinueButton type="submit">Continue</ContinueButton>
    </FormContainer>
  );
};

export default CustomerInfoForm;
