import React from "react";
import { FormSelectContainer, SelectFormInput } from "./form-select.styles";
import { InputLabel } from "../file-upload/file-upload.styles";

const FormSelect = ({
  noneSelectedText = "Select an Option",
  selectedOptionChangeHandler,
  defaultSelectedOption,
  optionsToValueMap = [],
  nameOfValueField,
  nameOfOptionField,
  label,
  ...otherProps
}) => (
  <FormSelectContainer>
    <InputLabel>{label}</InputLabel>
    <SelectFormInput
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

export default FormSelect;
