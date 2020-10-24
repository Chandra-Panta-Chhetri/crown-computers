import React from "react";
import {
  CategoryEntryContainer,
  CategoryImagePreview,
  CardContainer,
  DeleteCategoryIcon
} from "./category-entry.styles";

import { connect } from "react-redux";
import { startDeleteCategoryById } from "../../redux/product-category/product-category.actions";

const CategoryEntry = ({ category, intersectionCb, deleteCategoryById }) => {
  const { category: categoryName, imageUrl, categoryId } = category;

  return (
    <CategoryEntryContainer ref={intersectionCb}>
      <CardContainer>
        <DeleteCategoryIcon
          onConfirmation={() => deleteCategoryById(categoryId, categoryName)}
          confirmButtonText="Delete Product Category"
          modalTitle="Delete Category Confirmation"
        >
          <p>
            Are you sure you want to delete this category? Doing so will also
            delete all the products in <span>{categoryName}</span>.
          </p>
        </DeleteCategoryIcon>
        <CategoryImagePreview src={imageUrl} alt={categoryName} />
        <span>{categoryName}</span>
      </CardContainer>
    </CategoryEntryContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCategoryById: (categoryId, categoryName) =>
    dispatch(startDeleteCategoryById(categoryId, categoryName))
});

export default connect(null, mapDispatchToProps)(CategoryEntry);
