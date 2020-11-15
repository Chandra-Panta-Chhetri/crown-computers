import React, { useRef, useState } from "react";
import {
  FileUploadContainer,
  InputLabel,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  FilePreview,
  PreviewList,
  FileMetaData,
  RemoveFileIcon
} from "./file-upload.styles";

import { convertNestedObjectToArray } from "../../global.utils";
import { connect } from "react-redux";
import { addWarningNotification } from "../../redux/notification/notification.actions";

const KILO_BYTES_PER_BYTE = 1024;

const FormInput = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = 100000,
  displayWarningNotification,
  defaultFiles = {},
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState(defaultFiles);

  const convertBytesToKiloBytes = (bytes) =>
    Math.round(bytes / KILO_BYTES_PER_BYTE);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      } else {
        displayWarningNotification(
          "File Size Too Large",
          `${
            file.name
          } file size exceeds the maxium file size allowed (${convertBytesToKiloBytes(
            maxFileSizeInBytes
          )} kb)`
        );
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
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
          onChange={handleNewFileUpload}
          title=""
          value={""}
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <span>To Upload</span>
        <PreviewList>
          {(Object.keys(files) || []).map((fileKey, index) => {
            let file = files[fileKey];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <FilePreview key={index}>
                {isImageFile && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${index}`}
                  />
                )}
                <FileMetaData isImageFile={isImageFile}>
                  <span>{file.name}</span>
                  <aside>
                    <span>{convertBytesToKiloBytes(file.size)} kb</span>
                    <RemoveFileIcon
                      className="fas fa-trash-alt"
                      onClick={() => removeFile(fileKey)}
                    />
                  </aside>
                </FileMetaData>
              </FilePreview>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  displayWarningNotification: (title, msg) =>
    dispatch(addWarningNotification(title, msg))
});

export default connect(null, mapDispatchToProps)(FormInput);
