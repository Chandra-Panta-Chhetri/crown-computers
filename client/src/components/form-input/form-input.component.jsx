import React from "react";
import {
  FormInputContainer,
  InputLabel,
  FormField,
  Textarea
} from "./form-input.styles";

const FormInput = ({
  label,
  inputChangeHandler,
  inputValue,
  isTextarea = false,
  className,
  ...otherFieldProps
}) => (
  <FormInputContainer className={className}>
    <InputLabel>{label}</InputLabel>
    {!isTextarea ? (
      <FormField
        onChange={inputChangeHandler}
        value={inputValue}
        {...otherFieldProps}
      />
    ) : (
      <Textarea
        onChange={inputChangeHandler}
        value={inputValue}
        {...otherFieldProps}
      />
    )}
  </FormInputContainer>
);

export default FormInput;
