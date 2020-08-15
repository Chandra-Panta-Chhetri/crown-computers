import React from "react";
import {
  NavBarContainer,
  LogoContainer,
  NavBarItems,
  NavItem
} from "./navbar.styles";

import CartDropDown from "../cart-drop-down/cart-drop-down.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { logOutStart } from "../../redux/user/user.actions";

const NavBar = ({ currentUser, hidden, logOut }) => (
  <NavBarContainer>
    <LogoContainer>
      <Link to="/">
        <i className="fas fa-home fa-3x"></i>
      </Link>
    </LogoContainer>
    <NavBarItems>
      <NavItem to="/product-collection">Collection</NavItem>
      {!currentUser ? (
        <NavItem to="/login">Log In</NavItem>
      ) : (
        <NavItem onClick={logOut} to="/">
          Log Out
        </NavItem>
      )}
      {!currentUser ? <NavItem to="/signup">Sign Up</NavItem> : null}
      <CartIcon />
    </NavBarItems>
    {hidden ? null : <CartDropDown />}
  </NavBarContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartVisibility
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
