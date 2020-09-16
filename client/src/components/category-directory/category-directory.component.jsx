import React from "react";
import {
  CategoryDirectoryContainer,
  DirectoryImage,
  DirectoryContent,
  DirectoryTitle,
  DirectorySubtitle
} from "./category-directory.styles";

import { withRouter } from "react-router-dom";

const CategoryDirectory = ({ category, imageUrl, history }) => (
  <CategoryDirectoryContainer
    onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
  >
    <DirectoryImage imageUrl={imageUrl}></DirectoryImage>
    <DirectoryContent>
      <DirectoryTitle>{category.toUpperCase()}</DirectoryTitle>
      <DirectorySubtitle>SHOP NOW</DirectorySubtitle>
    </DirectoryContent>
  </CategoryDirectoryContainer>
);

export default withRouter(CategoryDirectory);
