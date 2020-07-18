import React from "react";
import { DirectoryContainer } from "./directory.styles";

import CategoryDirectory from "../category-directory/category-directory.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCategories } from "../../redux/directory/directory.selectors";

const Directory = ({ productCategories }) => (
  <DirectoryContainer>
    {productCategories.map(({ id, ...otherProductFields }) => (
      <CategoryDirectory key={id} {...otherProductFields} />
    ))}
  </DirectoryContainer>
);

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories
});

export default connect(mapStateToProps)(Directory);
