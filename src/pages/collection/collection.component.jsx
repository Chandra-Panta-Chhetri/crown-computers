import React from "react";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryCollection from "../../components/category-collection/category-collection.component";
import { Route } from "react-router-dom";

export const Collection = ({ match }) => (
  <div className="collection-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route
      path={`${match.path}/:productCategory`}
      component={CategoryCollection}
    />
  </div>
);

export default Collection;
