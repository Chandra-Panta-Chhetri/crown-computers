import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import FullPageSpinner from "../../components/full-page-spinner/full-page-spinner.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsUpdatingCart,
  selectCartLoadingText
} from "../../redux/cart/cart.selectors";

const CollectionOverview = lazy(() =>
  import("../../components/collection-overview/collection-overview.component")
);
const ProductDetail = lazy(() =>
  import("../../components/product-detail/product-detail.component")
);
const CategoryCollection = lazy(() =>
  import("../../components/category-collection/category-collection.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const ShopPage = ({ match, isUpdatingCart, cartLoadingText }) => {
  return (
    <article>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${match.path}`} component={CollectionOverview} />
          <Route
            exact
            path={`${match.path}/:productId`}
            component={ProductDetail}
          />
          <Route
            exact
            path={`${match.path}/category/:productCategory`}
            component={CategoryCollection}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
      <FullPageSpinner
        isLoading={isUpdatingCart}
        loadingText={cartLoadingText}
      />
    </article>
  );
};

const mapStateToProps = createStructuredSelector({
  isUpdatingCart: selectIsUpdatingCart,
  cartLoadingText: selectCartLoadingText
});

export default connect(mapStateToProps)(ShopPage);
