import React from "react";
import "./cart-items.styles.scss";

import CartItem from "../cart-item/cart-item.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartItems = ({ shoppingCart }) => (
  <div className="cart-items">
    {!shoppingCart.length ? (
      <span className="empty-cart">Your cart is empty</span>
    ) : (
      shoppingCart.map((item) => <CartItem key={item.id} item={item} />)
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  shoppingCart: selectCartItems
});

export default connect(mapStateToProps)(CartItems);
