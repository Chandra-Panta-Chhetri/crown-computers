import React from "react";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { selectNumCartItems } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartDropDown, numItemsInCart }) => (
  <div className="cart-icon" onClick={toggleCartDropDown}>
    <i className="fas fa-shopping-cart"></i>
    <span className="num-cart-items">{numItemsInCart}</span>
  </div>
);

const mapStateToProps = (state) => ({
  numItemsInCart: selectNumCartItems(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropDown: () => dispatch(toggleCartVisibility())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
