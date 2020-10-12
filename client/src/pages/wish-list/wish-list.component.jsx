import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import FullPageSpinner from "../../components/full-page-spinner/full-page-spinner.component";

import { connect } from "react-redux";
import {
  selectIsUpdatingWishList,
  selectWishListLoadingText
} from "../../redux/wish-list/wish-list.selectors";
import {
  selectCartLoadingText,
  selectIsUpdatingCart
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const WishListOverview = lazy(() =>
  import("../../components/wish-list-overview/wish-list-overview.component")
);
const WishListDetail = lazy(() =>
  import("../../components/wish-list-detail/wish-list-detail.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const WishList = ({
  match,
  wishListLoadingText,
  isUpdatingWishList,
  cartLoadingText,
  isUpdatingCart
}) => {
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
      <FullPageSpinner
        isLoading={isUpdatingWishList || isUpdatingCart}
        loadingText={isUpdatingCart ? cartLoadingText : wishListLoadingText}
      />
    </article>
  );
};

const mapStateToProps = createStructuredSelector({
  wishListLoadingText: selectWishListLoadingText,
  isUpdatingWishList: selectIsUpdatingWishList,
  isUpdatingCart: selectIsUpdatingCart,
  cartLoadingText: selectCartLoadingText
});

export default connect(mapStateToProps)(WishList);