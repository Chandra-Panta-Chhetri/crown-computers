import React from "react";
import { CartItemsContainer, EmptyCartText } from "./cart-items.styles";

import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShoppingCart } from "../../redux/cart/cart.selectors";

const CartItems = ({ shoppingCart }) => (
  <CartItemsContainer>
    {!shoppingCart.length ? (
      <EmptyCartText>Your cart is empty</EmptyCartText>
    ) : (
      shoppingCart.map((item) => <CartItem key={item.productId} item={item} />)
    )}
  </CartItemsContainer>
);

const mapStateToProps = createStructuredSelector({
  shoppingCart: selectShoppingCart
});

export default connect(mapStateToProps)(CartItems);
