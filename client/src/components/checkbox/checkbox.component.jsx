import React from "react";
import {
  CheckboxContainer,
  CheckboxLabel,
  CheckboxInput
} from "./checkbox.styles";

const Checkbox = ({
  label,
  inputChangeHandler = undefined,
  checkedStatus = false,
  ...otherFieldProps
}) => (
  <CheckboxContainer>
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
