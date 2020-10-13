import React from "react";
import {
  NavBarContainer,
  LogoContainer,
  NavBarItems,
  NavItem,
  LogOutBtn,
  Username
} from "./navbar.styles";

import CartDropDown from "../cart-drop-down/cart-drop-down.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { logOutStart } from "../../redux/user/user.actions";

const NavBar = ({ currentUser, hidden, logOut }) => (
  <NavBarContainer>
    <LogoContainer>
      <i className="fas fa-plug fa-3x"></i>
      {currentUser && (
        <Username>
          <span>{currentUser.fullName}</span>
          <i className="far fa-user" />
        </Username>
      )}
    </LogoContainer>
    <NavBarItems>
      <NavItem exact to="/" activeClassName="active">
        Home
      </NavItem>
      <NavItem to="/shop" activeClassName="active">
        Shop
      </NavItem>
      {currentUser && (
        <NavItem to="/wish-lists" activeClassName="active">
          Wish Lists
        </NavItem>
      )}

      {!currentUser ? (
        <NavItem to="/login" activeClassName="active">
          Log In
        </NavItem>
      ) : (
        <LogOutBtn onClick={logOut} to="/">
          Log Out
        </LogOutBtn>
      )}
      {!currentUser && (
        <NavItem to="/signup" activeClassName="active">
          Sign Up
        </NavItem>
      )}
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
