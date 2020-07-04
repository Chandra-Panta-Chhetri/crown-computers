import React from "react";
import "./category-collection.styles.scss";

import { selectCategoryCollection } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const CategoryCollection = ({ collection, match }) => (
  <div className="category-collection">
    <p>hi</p>
  </div>
);

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    collection: selectCategoryCollection(ownProps.match.params.productCategory)
  });

export default connect(mapStateToProps)(CategoryCollection);
