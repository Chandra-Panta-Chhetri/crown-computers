import React from "react";

import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCollection } from "../../redux/collection/collection.selectors";

const CollectionOverview = ({ productCollection }) => (
  <div className="collection-overview">
    {productCollection.map(({ id, ...otherCollectionFields }) => (
      <CollectionPreview key={id} {...otherCollectionFields} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  productCollection: selectProductCollection
});

export default connect(mapStateToProps)(CollectionOverview);
