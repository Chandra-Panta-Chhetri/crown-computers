import React from "react";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { selectNumCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ numItemsInCart, dispatch }) => (
  <div className="cart-icon" onClick={() => dispatch(toggleCartVisibility())}>
    <i className="fas fa-shopping-cart"></i>
    <span className="num-cart-items">{numItemsInCart}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  numItemsInCart: selectNumCartItems
});

export default connect(mapStateToProps)(CartIcon);
