import React, { useState } from "react";
import {
  Header,
  InputGroup,
  DynamicFormInputContainer
} from "./dynamic-form-input.styles";

const DynamicFormInput = ({
  defaultInputFields,
  inputFieldStructure,
  inputFieldComponents = [],
  onChangeCb,
  title
}) => {
  const [inputFields, setInputFields] = useState(
    defaultInputFields ? defaultInputFields : [inputFieldStructure]
  );
  const keysOfInputFieldStructure = Object.keys(inputFieldStructure);

  const handleChange = (index, e) => {
    inputFields[index][e.target.name] = e.target.value;
    setInputFields([...inputFields]);
    onChangeCb([...inputFields]);
  };

  const addNewField = () =>
    setInputFields([...inputFields, inputFieldStructure]);

  const removeField = (index) => {
    inputFields.splice(index, 1);
    setInputFields([...inputFields]);
    onChangeCb([...inputFields]);
  };

  return (
    <DynamicFormInputContainer>
      <Header>
        <span>{title}</span>
        <i className="fa fa-plus" onClick={addNewField} />
      </Header>
      {inputFields.map((inputField, inputFieldIndex) => (
        <InputGroup key={inputFieldIndex}>
          {inputFieldComponents.map(
            ({ component: InputFieldComponent, props }, index) => {
              let nameOfInputField = keysOfInputFieldStructure[index];
              let valueOfInputField =
                inputField[keysOfInputFieldStructure[index]];
              return (
                <InputFieldComponent
                  key={index}
                  {...props}
                  name={nameOfInputField}
                  value={valueOfInputField}
                  onChange={(e) => handleChange(inputFieldIndex, e)}
                  className="input-field"
                />
              );
            }
          )}
          <i
            className="fa fa-minus"
            onClick={() => removeField(inputFieldIndex)}
          />
        </InputGroup>
      ))}
    </DynamicFormInputContainer>
  );
};

export default DynamicFormInput;
