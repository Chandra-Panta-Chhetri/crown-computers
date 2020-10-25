import React from "react";
import { FormInputContainer, InputLabel, FormField } from "./form-input.styles";

const FormInput = ({
  label,
  inputChangeHandler = undefined,
  inputValue,
  ...otherFieldProps
}) => (
  <FormInputContainer>
    <InputLabel
      className={
        otherFieldProps.type === "file" || (inputValue && inputValue.length)
          ? "shrink"
          : ""
      }
    >
      {label}
    </InputLabel>
    <FormField
      onChange={inputChangeHandler}
      value={inputValue}
      {...otherFieldProps}
    />
  </FormInputContainer>
);

export default FormInput;
