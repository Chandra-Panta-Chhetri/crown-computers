import React from "react";
import {
  CategoryDirectoryContainer,
  CategoryImage,
  DirectoryContent,
  CategoryName,
  DirectorySubtitle
} from "./category-directory.styles";

import { withRouter } from "react-router-dom";

const CategoryDirectory = ({
  categoryInfo: { category, imageUrl },
  history,
  intersectionCb
}) => (
  <CategoryDirectoryContainer
    onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
    ref={intersectionCb}
  >
    <CategoryImage imageUrl={imageUrl}></CategoryImage>
    <DirectoryContent>
      <CategoryName>{category}</CategoryName>
      <DirectorySubtitle>SHOP NOW</DirectorySubtitle>
    </DirectoryContent>
  </CategoryDirectoryContainer>
);

export default withRouter(CategoryDirectory);
