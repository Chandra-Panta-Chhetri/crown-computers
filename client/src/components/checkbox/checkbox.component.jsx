import React from "react";
import {
  CheckboxContainer,
  CheckboxLabel,
  CheckboxInput
} from "./checkbox.styles";

const Checkbox = ({
  label,
  inputChangeHandler,
  checkedStatus,
  className,
  ...otherFieldProps
}) => (
  <CheckboxContainer className={className}>
    <CheckboxInput
      type="checkbox"
      onChange={inputChangeHandler}
      checked={checkedStatus}
      {...otherFieldProps}
    />
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);

export default Checkbox;
