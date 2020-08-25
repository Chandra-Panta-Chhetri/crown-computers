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
const ProductCollection = lazy(() =>
  import("../../pages/product-collection/product-collection.component")
);
const PageNotFound = lazy(() =>
  import("../../components/page-not-found/page-not-found.component")
);

const Routes = ({ currentUser }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/product-collection" component={ProductCollection} />
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
    <Route component={PageNotFound} />
  </Switch>
);

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(Routes);
