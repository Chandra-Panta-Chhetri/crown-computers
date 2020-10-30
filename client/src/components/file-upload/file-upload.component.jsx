import React from "react";
import { useRef } from "react";
import {
  FormInputContainer,
  InputLabel,
  FormField,
  DragDropText,
  UploadFileBtn
} from "./file-upload.styles";

const FormInput = ({
  label,
  inputChangeHandler = undefined,
  inputValue,
  ...otherProps
}) => {
  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  return (
    <FormInputContainer>
      <InputLabel className="shrink">{label}</InputLabel>
      <DragDropText>Drag and drop your files anywhere or</DragDropText>
      <UploadFileBtn
        type="button"
        onClick={handleUploadBtnClick}
        color="gray"
        variant="icon"
        iconClass="fas fa-file-upload"
      >
        Upload {otherProps.multiple ? "files" : "a file"}
      </UploadFileBtn>
      <FormField
        type="file"
        ref={fileInputField}
        onChange={inputChangeHandler}
        value={inputValue}
        title=""
        {...otherProps}
      />
    </FormInputContainer>
  );
};

export default FormInput;
