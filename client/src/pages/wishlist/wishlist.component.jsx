import React, { lazy, Suspense } from "react";

import { Route, Switch } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import FullPageSpinner from "../../components/full-page-spinner/full-page-spinner.component";
import { connect } from "react-redux";
import {
  selectIsUpdatingWishlist,
  selectWishlistLoadingText
} from "../../redux/wishlist/wishlist.selectors";
import {
  selectCartLoadingText,
  selectIsUpdatingCart
} from "../../redux/cart/cart.selectors";

const WishListOverview = lazy(() =>
  import("../../components/wishlist-overview/wishlist-overview.component")
);
const WishListDetail = lazy(() =>
  import("../../components/wishlist-detail/wishlist-detail.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const WishList = ({
  match,
  wishlistLoadingText,
  isUpdatingWishlist,
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
            path={`${match.path}/:wishlistId`}
            component={WishListDetail}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
      <FullPageSpinner
        isLoading={isUpdatingWishlist || isUpdatingCart}
        loadingText={isUpdatingCart ? cartLoadingText : wishlistLoadingText}
      />
    </article>
  );
};

const mapStateToProps = (state) => ({
  wishlistLoadingText: selectWishlistLoadingText(state),
  isUpdatingWishlist: selectIsUpdatingWishlist(state),
  isUpdatingCart: selectIsUpdatingCart(state),
  cartLoadingText: selectCartLoadingText(state)
});

export default connect(mapStateToProps)(WishList);
