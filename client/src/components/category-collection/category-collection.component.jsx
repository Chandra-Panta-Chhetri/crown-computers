import React from "react";
import { CategoryCollectionContainer } from "./category-collection.styles";

import CollectionItem from "../collection-item/collection-item.component";
import withSpinner from "../with-spinner/with-spinner.component";

import {
  selectCategoryCollection,
  selectIsFetchingCollection
} from "../../redux/collection/collection.selectors";
import { connect } from "react-redux";
import { compose } from "redux";

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
  )(state),
  isLoading: selectIsFetchingCollection(state)
});

export default compose(
  connect(mapStateToProps),
  withSpinner
)(CategoryCollection);
