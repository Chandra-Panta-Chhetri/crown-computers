import React from "react";
import "./navbar.styles.scss";

import CartDropDown from "../cart-drop-down/cart-drop-down.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/users/user.selectors";
import { createStructuredSelector } from "reselect";

const NavBar = ({ currentUser, hidden }) => (
  <div className="navbar">
    <div className="logo-container">
      <Link to="/">
        <i className="fas fa-crown fa-3x"></i>
      </Link>
    </div>
    <div className="navbar-items">
      <Link className="nav-item" to="/product-collection">
        Collection
      </Link>
      {!currentUser ? (
        <Link className="nav-item" to="/login">
          Log In
        </Link>
      ) : (
        <Link className="nav-item" onClick={() => auth.signOut()} to="/">
          Log Out
        </Link>
      )}
      {!currentUser ? (
        <Link className="nav-item" to="/signup">
          Sign Up
        </Link>
      ) : null}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropDown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartVisibility
});

export default connect(mapStateToProps)(NavBar);
