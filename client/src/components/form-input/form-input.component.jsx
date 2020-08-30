import React from "react";
import { FormInputContainer, InputLabel, FormField } from "./form-input.styles";

const FormInput = ({ label, handler, ...otherFieldProps }) => (
  <FormInputContainer>
    <InputLabel
      className={
        otherFieldProps.value && otherFieldProps.value.length ? "shrink" : ""
      }
    >
      {label}
    </InputLabel>
    <FormField onChange={handler} {...otherFieldProps} />
  </FormInputContainer>
);

export default FormInput;
