import React from "react";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";

const CartIcon = ({ toggleCartDropDown, numItemsInCart }) => (
  <div className="cart-icon" onClick={toggleCartDropDown}>
    <i className="fas fa-shopping-cart"></i>
    <span className="num-cart-items">{numItemsInCart}</span>
  </div>
);

const mapStateToProps = ({ cart: { numItemsInCart } }) => {
  return {
    numItemsInCart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartDropDown: () => dispatch(toggleCartVisibility())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
