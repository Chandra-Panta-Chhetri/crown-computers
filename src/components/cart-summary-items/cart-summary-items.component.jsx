import React from "react";
import "./cart-summary-items.styles.scss";

import CartSummaryItem from "../../components/cart-summary-item/cart-summary-item.component";

const CartSummaryItems = ({ cartItems }) => (
  <section className="cart-summary-items">
    {cartItems.map((cartItem) => (
      <CartSummaryItem key={cartItem.id} item={cartItem} />
    ))}
  </section>
);

export default CartSummaryItems;
