import React, { useEffect, lazy, Suspense } from "react";
import { ProductCollectionContainer } from "./shop.styles";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

import { connect } from "react-redux";
import { startCollectionFetch } from "../../redux/collection/collection.actions";
import { selectIsFetchingCollection } from "../../redux/collection/collection.selectors";

const CollectionOverview = lazy(() =>
  import("../../components/collection-overview/collection-overview.component")
);
const CategoryCollection = lazy(() =>
  import("../../components/category-collection/category-collection.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const ProductCollection = ({
  startCollectionFetch,
  match,
  isFetchingItems
}) => {
  useEffect(() => {
    startCollectionFetch();
  }, [startCollectionFetch]);

  return (
    <ProductCollectionContainer spinnerActive={isFetchingItems}>
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

const mapStateToProps = (state) => ({
  isFetchingItems: selectIsFetchingCollection(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCollectionFetch: () => dispatch(startCollectionFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);
