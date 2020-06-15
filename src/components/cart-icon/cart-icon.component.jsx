import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";

const CartIcon = ({ toggleCartDropDown }) => {
  return (
    <div className="cart-icon" onClick={toggleCartDropDown}>
      <i className="fas fa-shopping-cart"></i>
      <span className="num-cart-items">0</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartDropDown: () => dispatch(toggleCartVisibility())
  };
};

export default connect(null, mapDispatchToProps)(CartIcon);
