import React from "react";
import { CategoryCollectionContainer } from "./category-collection.styles";

import CollectionItem from "../collection-item/collection-item.component";

import { selectCategoryCollection } from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";

const CategoryCollection = ({ collectionInCategory }) => (
  <CategoryCollectionContainer>
    {collectionInCategory.items.map((item) => (
      <CollectionItem key={item.id} item={item} />
    ))}
  </CategoryCollectionContainer>
);

const mapStateToProps = (state, ownProps) => ({
  collectionInCategory: selectCategoryCollection(
    ownProps.match.params.productCategory
  )(state)
});

export default connect(mapStateToProps)(CategoryCollection);
