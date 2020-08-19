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
import { Redirect } from "react-router-dom";

const CategoryCollection = ({ collectionInCategory }) => (
  <CategoryCollectionContainer>
    {collectionInCategory.items.length ? (
      collectionInCategory.items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))
    ) : (
      <Redirect to="/product-collection" />
    )}
  </CategoryCollectionContainer>
);

const mapStateToProps = (state, ownProps) => ({
  collectionInCategory: selectCategoryCollection(
    ownProps.match.params.productCategory
  )(state),
  isLoading: selectIsFetchingCollection(state),
  loadingText: `Getting latest ${decodeURI(
    ownProps.match.params.productCategory
  )} collection`
});

export default compose(
  connect(mapStateToProps),
  withSpinner
)(CategoryCollection);
