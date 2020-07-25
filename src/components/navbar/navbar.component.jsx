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
import { auth } from "../../utils/firebaseConfig";
import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

const NavBar = ({ currentUser, hidden }) => (
  <NavBarContainer>
    <LogoContainer>
      <Link to="/">
        <i className="fas fa-crown fa-3x"></i>
      </Link>
    </LogoContainer>
    <NavBarItems>
      <NavItem to="/product-collection">Collection</NavItem>
      {!currentUser ? (
        <NavItem to="/login">Log In</NavItem>
      ) : (
        <NavItem onClick={() => auth.signOut()} to="/">
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

export default connect(mapStateToProps)(NavBar);
