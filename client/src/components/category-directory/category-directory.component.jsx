import React from "react";
import {
  CategoryDirectoryContainer,
  DirectoryImage,
  DirectoryContent,
  DirectoryTitle,
  DirectorySubtitle
} from "./category-directory.styles";

import { withRouter } from "react-router-dom";

const CategoryDirectory = ({ label, imageUrl, history, routePath }) => (
  <CategoryDirectoryContainer
    onClick={() => history.push(`/product-collection/${routePath}`)}
  >
    <DirectoryImage imageUrl={imageUrl}></DirectoryImage>
    <DirectoryContent>
      <DirectoryTitle>{label.toUpperCase()}</DirectoryTitle>
      <DirectorySubtitle>SHOP NOW</DirectorySubtitle>
    </DirectoryContent>
  </CategoryDirectoryContainer>
);

export default withRouter(CategoryDirectory);
