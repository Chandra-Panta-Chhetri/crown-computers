import React, { useEffect } from "react";
import { GlobalStyles } from "./global.styles";
import { ThemeProvider } from "styled-components";

import Navbar from "./components/navbar/navbar.component";
import Toast from "./components/toast/toast.component";
import AppRoutes from "./components/app-routes/app-routes.component";
import FullPageSpinner from "./components/full-page-spinner/full-page-spinner.component";

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
import { withRouter } from "react-router-dom";
import { selectThemeStyles } from "./redux/theme/theme.selectors";

const App = ({
  autoSignIn,
  history,
  isCartHidden,
  toggleCartVisibility,
  isChangingAuthState,
  wasSignedIn,
  userLoadingText,
  currentUser,
  theme
}) => {
  const isAdmin = currentUser && currentUser.isAdmin;
  useEffect(() => {
    console.log(process.env);
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
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        {isAdmin || <Navbar />}
        <AppRoutes />
        <FullPageSpinner isLoading={isChangingAuthState} loadingText={userLoadingText} />
        <Toast autoDelete dismissTime={1400} />
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  isCartHidden: selectCartVisibility,
  isChangingAuthState: selectIsChangingAuthState,
  userLoadingText: selectUserLoadingText,
  wasSignedIn: selectWasSignedIn,
  currentUser: selectCurrentUser,
  theme: selectThemeStyles
});

const mapDispatchToProps = (dispatch) => ({
  autoSignIn: () => dispatch(startAutoSignIn()),
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(App);
