import React, { lazy } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";

const LogIn = lazy(() => import("../../pages/login/login.component"));
const SignUp = lazy(() => import("../../pages/signup/signup.component"));
const Home = lazy(() => import("../../pages/home/home.component"));
const CartSummary = lazy(() =>
  import("../../pages/cart-summary/cart-summary.component")
);
const ShopPage = lazy(() => import("../../pages/shop/shop.component"));
const PageNotFound = lazy(() =>
  import("../page-not-found/page-not-found.component")
);
const WishList = lazy(() => import("../../pages/wishlist/wishlist.component"));

const AppRoutes = ({ currentUser }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={ShopPage} />
    <Route
      exact
      path="/login"
      render={() => (currentUser ? <Redirect to="/" /> : <LogIn />)}
    />
    <Route
      exact
      path="/signup"
      render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
    />
    <Route exact path="/cart-summary" component={CartSummary} />
    <Route
      path="/wishlists"
      render={(props) =>
        currentUser ? <Redirect to="/" /> : <WishList {...props} />
      }
    />
    <Route component={PageNotFound} />
  </Switch>
);

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(AppRoutes);
