import React from "react";
import {
  CategoryEntryContainer,
  CategoryImagePreview,
  CardContainer
} from "./category-entry.styles";

const CategoryEntry = ({ category, intersectionCb }) => {
  const { category: categoryName, imageUrl, categoryId } = category;

  return (
    <CategoryEntryContainer ref={intersectionCb}>
      <CardContainer>
        <CategoryImagePreview src={imageUrl} alt={categoryName} />
        <span>{categoryName}</span>
      </CardContainer>
    </CategoryEntryContainer>
  );
};

export default CategoryEntry;
