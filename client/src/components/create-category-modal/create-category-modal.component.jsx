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

const CreateCategoryModal = ({
  createNewCategory,
  closeModalHandler,
  modalTitle = "Create New Product Category",
  isEditing = false,
  defaultCategory,
  submitBtnText = "Create New Category",
  updateCategory
}) => {
  const [categoryInfo, setCategoryInfo] = useState({
    category: defaultCategory ? defaultCategory.category : "",
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
    const { name, value, files } = e.target;
    console.log(files[0], "dsadasd");
    setCategoryInfo((prevCategoryInfo) => {
      prevCategoryInfo[name] = name === "image" ? files[0] : value;
      return { ...prevCategoryInfo };
    });
  };

  return (
    <NewCategoryModal
      isOpen={true}
      closeModalHandler={closeModalHandler}
      modalTitle={modalTitle}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Category Name"
          inputValue={categoryInfo.category}
          inputChangeHandler={handleChange}
          name="category"
          required
        />
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label={isEditing ? "New Category Image" : "Category Image"}
          inputChangeHandler={handleChange}
          name="image"
          required={!isEditing}
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
    dispatch(updateCategoryInfo(updatedCategoryInfo, categoryId, onSuccess))
});

export default connect(null, mapDispatchToProps)(CreateCategoryModal);
