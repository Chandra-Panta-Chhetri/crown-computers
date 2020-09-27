import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import FullPageSpinner from "../../components/full-page-spinner/full-page-spinner.component";

const WishListOverview = lazy(() =>
  import("../../components/wishlist-overview/wishlist-overview.component")
);
const WishListDetail = lazy(() =>
  import("../../components/wishlist-detail/wishlist-detail.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const WishList = ({ match }) => {
  return (
    <article>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${match.path}`} component={WishListOverview} />
          <Route
            exact
            path={`${match.path}/:wishListId`}
            component={WishListDetail}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
      <FullPageSpinner isLoading={false} loadingText="Wishlist loading text" />
    </article>
  );
};

export default WishList;
