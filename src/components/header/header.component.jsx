import React from "react";
import "./header.styles.scss";

import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { connect } from "react-redux";
import { selectCartVisibility } from "../../redux/cart/cart.selectors";

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

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  hidden: selectCartVisibility(state)
});

export default connect(mapStateToProps)(Header);
