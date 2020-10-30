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

const FormInput = ({ label, updateFilesCb, ...otherProps }) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      files[file.name] = file;
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
      let updatedFiles = otherProps.multiple
        ? addNewFiles(newFiles)
        : { file: newFiles[0] };
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
          onChange={handleNewFileUpload}
          title=""
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
                    <span>{Math.round(file.size / 1024)} kb</span>
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

export default FormInput;
