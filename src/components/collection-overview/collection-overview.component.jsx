import React from "react";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCollectionFromKeys } from "../../redux/collection/collection.selectors";

const CollectionOverview = ({ productCollection }) => {
  console.log("in overview ", productCollection);

  return (
    <div className="collection-overview">
      {productCollection.map(({ id, ...otherCollectionFields }) => (
        <CollectionPreview key={id} {...otherCollectionFields} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  productCollection: selectCollectionFromKeys
});

export default connect(mapStateToProps)(CollectionOverview);
