import React from "react";
import "./collection.styles.scss";

import { CollectionPreview } from "../../components/collection-preview/collection-preview.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProductCollection } from "../../redux/collection/collection.selectors";

const Collection = ({ productCollection }) => (
  <>
    {productCollection.map(({ id, ...otherCollectionFields }) => {
      return <CollectionPreview key={id} {...otherCollectionFields} />;
    })}
  </>
);

const mapStateToProps = createStructuredSelector({
  productCollection: selectProductCollection
});

export default connect(mapStateToProps)(Collection);
