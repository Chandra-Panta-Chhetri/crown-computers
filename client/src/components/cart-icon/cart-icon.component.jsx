import React from "react";
import { CartIconContainer, Badge, ShoppingCartIcon } from "./cart-icon.styles";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";
import { selectNumCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ numItemsInCart, dispatch }) => (
  <CartIconContainer onClick={() => dispatch(toggleCartVisibility())}>
    <ShoppingCartIcon>
      <i className="fas fa-shopping-cart"></i>
    </ShoppingCartIcon>
    <Badge>{numItemsInCart}</Badge>
  </CartIconContainer>
);

const mapStateToProps = createStructuredSelector({
  numItemsInCart: selectNumCartItems
});

export default connect(mapStateToProps)(CartIcon);
