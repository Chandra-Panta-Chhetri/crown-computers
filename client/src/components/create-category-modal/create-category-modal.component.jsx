import React, { useState } from "react";
import {
  NewCategoryModal,
  SubmitCategoryBtn
} from "./create-category-modal.styles";

import FormInput from "../form-input/form-input.component";
import FileUpload from "../file-upload/file-upload.component";

import { connect } from "react-redux";
import {
  createNewCategory,
  updateCategoryInfo
} from "../../redux/product-category/product-category.actions";
import { addInfoNotification } from "../../redux/notification/notification.actions";

const CreateCategoryModal = ({
  createNewCategory,
  closeModalHandler,
  modalTitle = "Create New Category",
  isEditing = false,
  defaultCategory,
  submitBtnText = "Create New Category",
  updateCategory,
  displayInfoNotification
}) => {
  const [categoryInfo, setCategoryInfo] = useState({
    category: defaultCategory ? defaultCategory.category : "",
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing && !categoryInfo.image) {
      return displayInfoNotification(
        "Category Creation Failed",
        "To create a new product category, an category image is required"
      );
    }
    if (isEditing) {
      return updateCategory(
        { ...defaultCategory, ...categoryInfo },
        defaultCategory.categoryId,
        closeModalHandler
      );
    }
    createNewCategory(categoryInfo, closeModalHandler);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryInfo({ ...categoryInfo, [name]: value });
  };

  const updateUploadedFiles = (files) =>
    setCategoryInfo({ ...categoryInfo, image: files[0] });

  return (
    <NewCategoryModal
      isOpen
      closeModalHandler={closeModalHandler}
      modalTitle={modalTitle}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Category Name*"
          inputValue={categoryInfo.category}
          inputChangeHandler={handleChange}
          name="category"
          required
          placeholder="Phones"
        />
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label={isEditing ? "New Category Image" : "Category Image*"}
          updateFilesCb={updateUploadedFiles}
        />
        <SubmitCategoryBtn type="submit">{submitBtnText}</SubmitCategoryBtn>
      </form>
    </NewCategoryModal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createNewCategory: (newCategoryInfo, onSuccess) =>
    dispatch(createNewCategory(newCategoryInfo, onSuccess)),
  updateCategory: (updatedCategoryInfo, categoryId, onSuccess) =>
    dispatch(updateCategoryInfo(updatedCategoryInfo, categoryId, onSuccess)),
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg))
});

export default connect(null, mapDispatchToProps)(CreateCategoryModal);
