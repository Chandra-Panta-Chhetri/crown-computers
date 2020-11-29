import React from "react";
import {
  FormInputContainer,
  InputLabel,
  FormField,
  Textarea
} from "./form-input.styles";

import { connect } from "react-redux";
import { selectThemeName } from "../../redux/theme/theme.selectors";

const FormInput = ({
  label,
  inputChangeHandler,
  inputValue,
  isTextarea = false,
  className,
  themeName,
  ...otherFieldProps
}) => (
  <FormInputContainer className={className}>
    <InputLabel>{label}</InputLabel>
    {!isTextarea ? (
      <FormField
        isDarkMode={themeName === "dark"}
        onChange={inputChangeHandler}
        value={inputValue}
        {...otherFieldProps}
      />
    ) : (
      <Textarea
        isDarkMode={themeName === "dark"}
        onChange={inputChangeHandler}
        value={inputValue}
        {...otherFieldProps}
      />
    )}
  </FormInputContainer>
);

const mapStateToProps = (state) => ({
  themeName: selectThemeName(state)
});

export default connect(mapStateToProps)(FormInput);
