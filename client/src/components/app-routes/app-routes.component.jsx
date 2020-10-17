import React, { lazy, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Spinner from "../spinner/spinner.component";
import ErrorBoundary from "../error-boundary/error-boundary.component";

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
const WishList = lazy(() =>
  import("../../pages/wish-list/wish-list.component")
);
const Dashboard = lazy(() =>
  import("../../pages/dashboard/dashboard.component")
);

const AppRoutes = ({ currentUser }) => {
  const isAdmin = currentUser && currentUser.isAdmin;
  const isAuthenticated = !!currentUser;
  const isAuthenticatedAndNotAdmin = currentUser && !currentUser.isAdmin;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isAdmin ? <Redirect to="/dashboard" /> : <Home {...props} />
            }
          />
          <Route
            path="/shop"
            render={(props) =>
              isAdmin ? <Redirect to="/dashboard" /> : <ShopPage {...props} />
            }
          />
          <Route
            exact
            path="/login"
            render={() => (isAuthenticated ? <Redirect to="/" /> : <LogIn />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (isAuthenticated ? <Redirect to="/" /> : <SignUp />)}
          />
          <Route
            exact
            path="/cart-summary"
            render={(props) =>
              isAdmin ? (
                <Redirect to="/dashboard" />
              ) : (
                <CartSummary {...props} />
              )
            }
          />
          <Route
            path="/wish-lists"
            render={(props) =>
              isAuthenticatedAndNotAdmin ? (
                <WishList {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            render={(props) =>
              isAdmin ? <Dashboard {...props} /> : <Redirect to="/" />
            }
          />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(AppRoutes);
