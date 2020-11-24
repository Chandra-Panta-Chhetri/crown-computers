import React, { useState } from "react";
import {
  CategoryEntryContainer,
  CategoryImagePreview,
  CardContainer,
  CategoryActionContainer,
  EditCategoryIcon,
  DeleteCategoryModal
} from "./category-entry.styles";

import CreateCategoryModal from "../create-category-modal/create-category-modal.component";

import { connect } from "react-redux";
import { startDeleteCategoryById } from "../../redux/product-category/product-category.actions";

const CategoryEntry = ({ category, intersectionCb, deleteCategoryById }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  const { category: categoryName, imageUrl } = category;

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
              submitBtnText="Update Category"
            />
          )}
          <DeleteCategoryModal
            onConfirmation={() => deleteCategoryById(category)}
            confirmButtonText="Delete Product Category"
            modalTitle="Delete Category Confirmation"
          >
            <p>
              Are you sure you want to delete this category? Doing so will also
              delete all the products in <span>{categoryName}</span>.
            </p>
          </DeleteCategoryModal>
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
