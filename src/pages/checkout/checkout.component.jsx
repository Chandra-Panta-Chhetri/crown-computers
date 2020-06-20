import React from "react";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CheckOut = ({ cartItems }) => (
  <div className="checkout">
    <div className="header">
      <h4>Product</h4>
      <h4>Item Name</h4>
      <h4>Quantity</h4>
      <h4>Price</h4>
      <h4>Remove</h4>
    </div>
    <hr />
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} item={cartItem} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CheckOut);
