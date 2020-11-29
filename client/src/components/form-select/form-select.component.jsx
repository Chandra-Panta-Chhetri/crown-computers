import React from "react";
import { SelectFormInput } from "./form-select.styles";
import { FormInputContainer as FormSelectContainer } from "../form-input/form-input.styles";
import { InputLabel } from "../form-input/form-input.styles";

import { connect } from "react-redux";
import { selectThemeName } from "../../redux/theme/theme.selectors";

const FormSelect = ({
  noneSelectedText = "Select an Option",
  selectedOptionChangeHandler,
  defaultSelectedOption,
  optionsToValueMap = [],
  nameOfValueField,
  nameOfOptionField,
  label,
  themeName,
  ...otherProps
}) => (
  <FormSelectContainer>
    <InputLabel>{label}</InputLabel>
    <SelectFormInput
      isDarkMode={themeName === "dark"}
      onChange={selectedOptionChangeHandler}
      value={defaultSelectedOption}
      {...otherProps}
    >
      <option value="">{noneSelectedText}</option>
      {optionsToValueMap.map((option) => (
        <option value={option[nameOfValueField]} key={option[nameOfValueField]}>
          {option[nameOfOptionField]}
        </option>
      ))}
    </SelectFormInput>
  </FormSelectContainer>
);

const mapStateToProps = (state) => ({
  themeName: selectThemeName(state)
});

export default connect(mapStateToProps)(FormSelect);
