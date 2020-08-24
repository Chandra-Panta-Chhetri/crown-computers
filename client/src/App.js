import React, { useEffect, lazy, Suspense } from "react";
import { GlobalStyles } from "./global.styles";

import NavBar from "./components/navbar/navbar.component";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Toast from "./components/toast/toast.component";

import {
  selectCurrentUser,
  selectIsLogginIn
} from "./redux/user/user.selectors";
import { signInUserFromSession } from "./redux/user/user.actions";
import { selectCartVisibility } from "./redux/cart/cart.selectors";
import { toggleCartVisibility } from "./redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

const LogIn = lazy(() => import("./pages/login/login.component"));
const SignUp = lazy(() => import("./pages/signup/signup.component"));
const Home = lazy(() => import("./pages/home/home.component"));
const CartSummary = lazy(() =>
  import("./pages/cart-summary/cart-summary.component")
);
const ProductCollection = lazy(() =>
  import("./pages/product-collection/product-collection.component")
);
const PageNotFound = lazy(() =>
  import("./components/page-not-found/page-not-found.component")
);

const App = ({
  signInUserFromSession,
  currentUser,
  history,
  isCartHidden,
  toggleCartVisibility,
  isLoggingIn
}) => {
  useEffect(() => {
    signInUserFromSession();
  }, [signInUserFromSession]);

  useEffect(() => {
    return history.listen(() => {
      if (!isCartHidden) {
        toggleCartVisibility();
      }
    });
  }, [history, toggleCartVisibility, isCartHidden]);

  return (
    <div>
      <GlobalStyles />
      {isLoggingIn ? (
        <Spinner loadingText="Signing in and checking for saved cart" />
      ) : (
        <>
          <NavBar />
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  path="/product-collection"
                  component={ProductCollection}
                />
                <Route
                  exact
                  path="/login"
                  render={() => (currentUser ? <Redirect to="/" /> : <LogIn />)}
                />
                <Route
                  exact
                  path="/signup"
                  render={() =>
                    currentUser ? <Redirect to="/" /> : <SignUp />
                  }
                />
                <Route exact path="/cart-summary" component={CartSummary} />
                <Route component={PageNotFound} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </>
      )}
      <Toast autoDelete dismissTime={2700} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCartHidden: selectCartVisibility,
  isLoggingIn: selectIsLogginIn
});

const mapDispatchToProps = (dispatch) => ({
  signInUserFromSession: () => dispatch(signInUserFromSession()),
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
