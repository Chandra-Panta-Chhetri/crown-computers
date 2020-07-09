import React from "react";
import "./category-collection.styles.scss";

import CollectionItem from "../collection-item/collection-item.component";

import { selectCategoryCollection } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";

const CategoryCollection = ({ collectionInCategory }) => (
  <div className="category-collection">
    {collectionInCategory.items.map((item) => (
      <CollectionItem key={item.id} item={item} />
    ))}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collectionInCategory: selectCategoryCollection(
    ownProps.match.params.productCategory
  )(state)
});

export default connect(mapStateToProps)(CategoryCollection);
