import React from "react";
import { FormInputContainer, InputLabel, FormField } from "./form-input.styles";

const FormInput = ({
  label,
  inputChangeHandler,
  inputValue = "",
  ...otherFieldProps
}) => (
  <FormInputContainer>
    <InputLabel className={inputValue.length ? "shrink" : ""}>
      {label}
    </InputLabel>
    <FormField
      onChange={inputChangeHandler}
      inputValue={inputValue}
      {...otherFieldProps}
    />
  </FormInputContainer>
);

export default FormInput;
