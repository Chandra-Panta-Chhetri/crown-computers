import React, { lazy, Suspense } from "react";
import { ProductCollectionContainer } from "./shop.styles";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

const CollectionOverview = lazy(() =>
  import("../../components/collection-overview/collection-overview.component")
);
const CategoryCollection = lazy(() =>
  import("../../components/category-collection/category-collection.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const ProductCollection = ({ match }) => {
  return (
    <ProductCollectionContainer>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${match.path}`} component={CollectionOverview} />
          <Route
            exact
            path={`${match.path}/:productCategory`}
            component={CategoryCollection}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </ProductCollectionContainer>
  );
};

export default ProductCollection;
