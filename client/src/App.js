import React, { useEffect } from "react";
import { GlobalStyles } from "./global.styles";

import NavBar from "./components/navbar/navbar.component";
import Toast from "./components/toast/toast.component";
import AppRoutes from "./components/app-routes/app-routes.component";
import FullPageSpinner from "./components/full-page-spinner/full-page-spinner.component";
import { withRouter } from "react-router-dom";

import {
  selectCurrentUser,
  selectIsChangingAuthState,
  selectUserLoadingText,
  selectWasSignedIn
} from "./redux/user/user.selectors";
import { startAutoSignIn } from "./redux/user/user.actions";
import { selectCartVisibility } from "./redux/cart/cart.selectors";
import { toggleCartVisibility } from "./redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

const App = ({
  autoSignIn,
  history,
  isCartHidden,
  toggleCartVisibility,
  isChangingAuthState,
  wasSignedIn,
  userLoadingText,
  currentUser
}) => {
  useEffect(() => {
    if (wasSignedIn) {
      autoSignIn();
    }
  }, [autoSignIn]);

  useEffect(() => {
    return history.listen(() => {
      //scrolls user back to top of page as in some cases where only the content changes
      //and component is the same, user not scrolled to top
      window.scrollTo(0, 0);
      if (!isCartHidden) {
        toggleCartVisibility();
      }
    });
  }, [history, toggleCartVisibility, isCartHidden]);

  return (
    <div>
      <GlobalStyles />
      {(currentUser && currentUser.isAdmin) || <NavBar />}
      <AppRoutes />
      <FullPageSpinner
        isLoading={isChangingAuthState}
        loadingText={userLoadingText}
      />
      <Toast autoDelete dismissTime={2000} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCartHidden: selectCartVisibility,
  isChangingAuthState: selectIsChangingAuthState,
  userLoadingText: selectUserLoadingText,
  wasSignedIn: selectWasSignedIn,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  autoSignIn: () => dispatch(startAutoSignIn()),
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
