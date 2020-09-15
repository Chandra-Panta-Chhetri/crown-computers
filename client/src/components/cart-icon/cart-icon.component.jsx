import React from "react";
import { CartIconContainer, ShoppingCartIcon } from "./cart-icon.styles";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { selectNumCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import Badge from "../badge/badge.component";

const CartIcon = ({ numItemsInCart, dispatch }) => (
  <CartIconContainer onClick={() => dispatch(toggleCartVisibility())}>
    <ShoppingCartIcon>
      <i className="fas fa-shopping-cart"></i>
    </ShoppingCartIcon>
    <Badge text={numItemsInCart} />
  </CartIconContainer>
);

const mapStateToProps = createStructuredSelector({
  numItemsInCart: selectNumCartItems
});

export default connect(mapStateToProps)(CartIcon);
