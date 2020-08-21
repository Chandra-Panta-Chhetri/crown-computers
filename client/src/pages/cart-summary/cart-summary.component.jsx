import React from "react";
import { CartSummaryContainer } from "./cart-summary.styles";

import CartSummaryItems from "../../components/cart-summary-items/cart-summary-items.component";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { connect } from "react-redux";
import {
  selectShoppingCart,
  selectCartTotal
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartSummary = ({ cartItems, cartTotal }) => (
  <CartSummaryContainer>
    <CartSummaryItems cartItems={cartItems} />
    {cartItems.length ? <OrderSummary cartTotal={cartTotal} /> : null}
  </CartSummaryContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectShoppingCart,
  cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CartSummary);
