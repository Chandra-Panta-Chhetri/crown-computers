import React from "react";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

const ProductCollection = ({ match }) => (
  <div className="product-collection">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route
      path={`${match.path}/:productCategory`}
      component={CategoryCollection}
    />
  </div>
);

export default ProductCollection;
