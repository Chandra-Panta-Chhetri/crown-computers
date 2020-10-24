import React from "react";
import {
  CategoryEntryContainer,
  CategoryImagePreview,
  CardContainer,
  DeleteCategoryIcon
} from "./category-entry.styles";

const CategoryEntry = ({ category, intersectionCb }) => {
  const { category: categoryName, imageUrl, categoryId } = category;

  return (
    <CategoryEntryContainer ref={intersectionCb}>
      <CardContainer>
        <DeleteCategoryIcon
          onConfirmation={() => console.log("deleting")}
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

export default CategoryEntry;
