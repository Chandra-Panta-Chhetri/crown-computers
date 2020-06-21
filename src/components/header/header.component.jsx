import React from "react";
import "./header.styles.scss";

import CartDropDown from "../cart-drop-down/cart-drop-down.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/users/user.selectors";
import { createStructuredSelector } from "reselect";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <div className="logo-container">
      <Link to="/">
        <i className="fas fa-crown fa-3x"></i>
      </Link>
    </div>
    <div className="options">
      <Link className="option" to="/collection">
        Collection
      </Link>
      {!currentUser ? (
        <Link className="option" to="/login">
          Log In
        </Link>
      ) : (
        <Link className="option" onClick={() => auth.signOut()} to="/">
          Log Out
        </Link>
      )}
      {!currentUser ? (
        <Link className="option" to="/signup">
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

export default connect(mapStateToProps)(Header);
