import React, { useState } from "react";
import {
  NavBarContainer,
  LogoContainer,
  NavBarItems,
  NavItem,
  LogOutBtn,
  Username,
  ToggleIcon,
  FlexContainer,
  NavMenuClose,
  LogoIcon
} from "./navbar.styles";

import CartDropDown from "../cart-drop-down/cart-drop-down.component";
import CartIcon from "../cart-icon/cart-icon.component";
import ThemeToggle from "../theme-toggle/theme-toggle.component";

import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { startLogOut } from "../../redux/user/user.actions";
import { truncate } from "../../global.utils";

const Navbar = ({ currentUser, hidden, logOut }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const logOutClick = () => {
    logOut();
    if (isCollapsed) {
      toggleCollapse();
    }
  };

  return (
    <NavBarContainer>
      <LogoContainer>
        <LogoIcon className="fas fa-plug" />
        <ThemeToggle />
        {currentUser && (
          <Username>
            <span>{truncate(currentUser.fullName)}</span>
            <i className="far fa-user" />
          </Username>
        )}
      </LogoContainer>
      <FlexContainer>
        <ToggleIcon className="fas fa-bars" onClick={toggleCollapse} />
        <NavBarItems isCollapsed={isCollapsed}>
          <NavMenuClose className="fas fa-times" onClick={toggleCollapse} />
          <NavItem
            exact
            to="/"
            activeClassName="active"
            onClick={toggleCollapse}
          >
            Home
          </NavItem>
          <NavItem to="/shop" activeClassName="active" onClick={toggleCollapse}>
            Shop
          </NavItem>
          {currentUser && (
            <NavItem
              to="/wish-lists"
              activeClassName="active"
              onClick={toggleCollapse}
            >
              Wish Lists
            </NavItem>
          )}
          {!currentUser ? (
            <NavItem
              to="/login"
              activeClassName="active"
              onClick={toggleCollapse}
            >
              Log In
            </NavItem>
          ) : (
            <LogOutBtn onClick={logOutClick} to="/">
              Log Out
            </LogOutBtn>
          )}
          {!currentUser && (
            <NavItem
              to="/signup"
              activeClassName="active"
              onClick={toggleCollapse}
            >
              Sign Up
            </NavItem>
          )}
        </NavBarItems>
        <CartIcon />
      </FlexContainer>
      {hidden ? null : <CartDropDown />}
    </NavBarContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartVisibility
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(startLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
