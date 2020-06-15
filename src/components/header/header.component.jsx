import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { connect } from "react-redux";
import { Cart } from "../cart/cart.component";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";

const Header = ({ currentUser, toggleCart, hidden }) => {
  return (
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
        <div className="cart-icon" onClick={toggleCart}>
          <i className="fas fa-shopping-cart"></i>
          <span>0</span>
        </div>
      </div>
      {hidden ? null : <Cart />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: () => dispatch(toggleCartVisibility())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
