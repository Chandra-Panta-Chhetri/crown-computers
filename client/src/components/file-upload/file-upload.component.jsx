import React from "react";
import {
  FormInputContainer,
  InputLabel,
  FormField
} from "./file-upload.styles";

const FormInput = ({
  label,
  inputChangeHandler = undefined,
  inputValue,
  ...otherFieldProps
}) => (
  <FormInputContainer>
    <InputLabel className="shrink">{label}</InputLabel>
    <FormField
      type="file"
      onChange={inputChangeHandler}
      value={inputValue}
      {...otherFieldProps}
    />
  </FormInputContainer>
);

export default FormInput;
