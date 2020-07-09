import React from "react";
import "./directory.styles.scss";

import CategoryDirectory from "../category-directory/category-directory.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCategories } from "../../redux/directory/directory.selectors";

const Directory = ({ productCategories }) => (
  <div className="directory">
    {productCategories.map(({ id, ...otherProductFields }) => (
      <CategoryDirectory key={id} {...otherProductFields} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories
});

export default connect(mapStateToProps)(Directory);
