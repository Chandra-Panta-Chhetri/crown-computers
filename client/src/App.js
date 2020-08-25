import React, { useEffect, Suspense } from "react";
import { GlobalStyles } from "./global.styles";

import NavBar from "./components/navbar/navbar.component";
import { withRouter } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Toast from "./components/toast/toast.component";
import Routes from "./components/routes/routes.component";

import {
  selectIsChangingAuthState,
  selectLoadingText
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
  loadingText
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
        <Spinner loadingText={loadingText} />
      ) : (
        <>
          <NavBar />
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Routes />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
      <Toast autoDelete dismissTime={2700} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCartHidden: selectCartVisibility,
  isChangingAuthState: selectIsChangingAuthState,
  loadingText: selectLoadingText
});

const mapDispatchToProps = (dispatch) => ({
  signInUserFromSession: () => dispatch(signInUserFromSession()),
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
