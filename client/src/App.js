import React, { useEffect, lazy, Suspense } from "react";
import { GlobalStyles } from "./global.styles";

import NavBar from "./components/navbar/navbar.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Toast from "./components/toast/toast.component";

import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { signInUserFromSession } from "./redux/user/user.actions";

const LogIn = lazy(() => import("./pages/login/login.component"));
const SignUp = lazy(() => import("./pages/signup/signup.component"));
const Home = lazy(() => import("./pages/home/home.component"));
const CartSummary = lazy(() =>
  import("./pages/cart-summary/cart-summary.component")
);
const ProductCollection = lazy(() =>
  import("./pages/product-collection/product-collection.component")
);

const App = ({ signInUserFromSession, currentUser }) => {
  useEffect(() => {
    signInUserFromSession();
  }, [signInUserFromSession]);

  return (
    <div>
      <GlobalStyles />
      <NavBar />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
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
          </Switch>
        </Suspense>
      </ErrorBoundary>
      <Toast autoDelete dismissTime={2500} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  signInUserFromSession: () => dispatch(signInUserFromSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
