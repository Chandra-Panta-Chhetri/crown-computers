import React from "react";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { OrderSummary } from "../../components/order-summary/order-summary.component";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CheckOut = ({ cartItems, cartTotal }) => (
  <article className="checkout-summary">
    <section className="checkout-items">
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} item={cartItem} />
      ))}
    </section>
    {cartItems.length ? <OrderSummary cartTotal={cartTotal} /> : null}
  </article>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckOut);
