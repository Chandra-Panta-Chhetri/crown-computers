import React, { useState } from "react";
import {
  CategoryEntryContainer,
  CategoryImagePreview,
  CardContainer,
  CategoryActionContainer,
  EditCategoryIcon
} from "./category-entry.styles";

import CreateCategoryModal from "../create-category-modal/create-category-modal.component";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";

import { connect } from "react-redux";
import { startDeleteCategoryById } from "../../redux/product-category/product-category.actions";

const CategoryEntry = ({ category, intersectionCb, deleteCategoryById }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const { category: categoryName, imageUrl } = category;
  console.log("here", categoryName);
  return (
    <CategoryEntryContainer ref={intersectionCb}>
      <CardContainer>
        <CategoryActionContainer>
          <EditCategoryIcon
            onClick={() => setIsEditModalOpen(true)}
            className="fas fa-pencil-alt"
          />
          {isEditModalOpen && (
            <CreateCategoryModal
              modalTitle="Edit Product Category"
              closeModalHandler={closeEditModal}
              isEditing
              defaultCategory={category}
              submitBtnText="Update Product Category"
            />
          )}
          <DeleteConfirmationModal
            onConfirmation={() => deleteCategoryById(category)}
            confirmButtonText="Delete Product Category"
            modalTitle="Delete Category Confirmation"
          >
            <p>
              Are you sure you want to delete this category? Doing so will also
              delete all the products in <span>{categoryName}</span>.
            </p>
          </DeleteConfirmationModal>
        </CategoryActionContainer>
        <CategoryImagePreview src={imageUrl} alt={categoryName} />
        <span>{categoryName}</span>
      </CardContainer>
    </CategoryEntryContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCategoryById: (categoryToDelete) =>
    dispatch(startDeleteCategoryById(categoryToDelete))
});

export default connect(null, mapDispatchToProps)(CategoryEntry);
