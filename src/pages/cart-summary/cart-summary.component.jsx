import React from "react";
import "./cart-summary.styles.scss";

import CartSummaryItems from "../../components/cart-summary-items/cart-summary-items.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartSummary = ({ cartItems, cartTotal }) => (
  <article className="cart-summary">
    <CartSummaryItems cartItems={cartItems} />
    {cartItems.length ? <OrderSummary cartTotal={cartTotal} /> : null}
  </article>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CartSummary);
