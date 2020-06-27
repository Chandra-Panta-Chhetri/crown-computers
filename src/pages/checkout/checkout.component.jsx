import React from "react";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CheckOut = ({ cartItems, cartTotal }) => (
  <div className="checkout-summary">
    <h3>Your Cart Summary</h3>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} item={cartItem} />
    ))}
    <h4 className="cart-total">${cartTotal}</h4>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckOut);
