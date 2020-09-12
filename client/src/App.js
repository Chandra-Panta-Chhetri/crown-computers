import React, { useEffect, Suspense } from "react";
import { GlobalStyles } from "./global.styles";

import NavBar from "./components/navbar/navbar.component";
import { withRouter } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Toast from "./components/toast/toast.component";
import AppRoutes from "./components/app-routes/app-routes.component";

import {
  selectIsChangingAuthState,
  selectUserLoadingText
} from "./redux/user/user.selectors";
import { signInUserFromSession } from "./redux/user/user.actions";
import { selectCartVisibility } from "./redux/cart/cart.selectors";
import { toggleCartVisibility } from "./redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

const App = ({
  signInUserFromSession,
  history,
  isCartHidden,
  toggleCartVisibility,
  isChangingAuthState,
  userLoadingText
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
      {isChangingAuthState ? (
        <Spinner loadingText={userLoadingText} />
      ) : (
        <>
          <NavBar />
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
      <Toast autoDelete dismissTime={2650} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCartHidden: selectCartVisibility,
  isChangingAuthState: selectIsChangingAuthState,
  userLoadingText: selectUserLoadingText
});

const mapDispatchToProps = (dispatch) => ({
  signInUserFromSession: () => dispatch(signInUserFromSession()),
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
