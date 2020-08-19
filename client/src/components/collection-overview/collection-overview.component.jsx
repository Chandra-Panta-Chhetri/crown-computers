import React from "react";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import withSpinner from "../with-spinner/with-spinner.component";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  selectCollectionFromKeys,
  selectIsFetchingCollection
} from "../../redux/collection/collection.selectors";

const CollectionOverview = ({ productCollection }) => (
  <div className="collection-overview">
    {productCollection.map(({ id, ...otherCollectionFields }) => (
      <CollectionPreview key={id} {...otherCollectionFields} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  productCollection: selectCollectionFromKeys(state),
  isLoading: selectIsFetchingCollection(state),
  loadingText: "Getting latest products"
});

export default compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionOverview);
