import React from "react";
import "./directory.styles.scss";

import ProductCategory from "../product-category/product-category.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCategories } from "../../redux/directory/directory.selectors";

const Directory = ({ productCategories }) => (
  <div className="directory-menu">
    {productCategories.map(({ id, ...otherProductFields }) => (
      <ProductCategory key={id} {...otherProductFields} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories
});

export default connect(mapStateToProps)(Directory);
