import React, { useState } from "react";
import {
  AddCategoryBtn,
  NewCategoryModal,
  SubmitCategoryBtn
} from "./new-category-btn.styles";

import FormInput from "../form-input/form-input.component";

import { connect } from "react-redux";
import { createNewCategory } from "../../redux/product-category/product-category.actions";

const NewCategoryBtn = ({ createNewCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const [newCategoryInfo, setNewCategoryInfo] = useState({
    category: "",
    imageUrl: "https://dummyimage.com/400"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCategory(newCategoryInfo, closeModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryInfo((prevCategoryInfo) => {
      prevCategoryInfo[name] = value;
      return { ...prevCategoryInfo };
    });
  };

  return (
    <>
      <AddCategoryBtn
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsModalOpen(true)}
      >
        New Category
      </AddCategoryBtn>
      {isModalOpen && (
        <NewCategoryModal
          isOpen={true}
          closeModalHandler={closeModal}
          modalTitle="Create New Product Category"
        >
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Category Name"
              inputValue={newCategoryInfo.category}
              inputChangeHandler={handleChange}
              name="category"
              required
            />
            <SubmitCategoryBtn type="submit">
              Create New Category
            </SubmitCategoryBtn>
          </form>
        </NewCategoryModal>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createNewCategory: (newCategoryInfo, onSuccess) =>
    dispatch(createNewCategory(newCategoryInfo, onSuccess))
});

export default connect(null, mapDispatchToProps)(NewCategoryBtn);
