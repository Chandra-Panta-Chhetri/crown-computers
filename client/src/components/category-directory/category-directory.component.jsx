import React from "react";
import {
  CategoryDirectoryContainer,
  CategoryImage,
  DirectoryContent,
  CategoryName,
  DirectorySubtitle
} from "./category-directory.styles";

import { withRouter } from "react-router-dom";

const CategoryDirectory = ({ category, imageUrl, history }) => (
  <CategoryDirectoryContainer
    onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
  >
    <CategoryImage imageUrl={imageUrl}></CategoryImage>
    <DirectoryContent>
      <CategoryName>{category}</CategoryName>
      <DirectorySubtitle>SHOP NOW</DirectorySubtitle>
    </DirectoryContent>
  </CategoryDirectoryContainer>
);

export default withRouter(CategoryDirectory);
