import React from "react";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import withSpinner from "../with-spinner/with-spinner.component";

import { createStructuredSelector } from "reselect";
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

const mapStateToProps = createStructuredSelector({
  productCollection: selectCollectionFromKeys,
  isLoading: selectIsFetchingCollection
});

export default compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionOverview);
