import React from "react";
import { CartSummaryItemsContainer } from "./cart-summary-items.styles";

import CartSummaryItem from "../../components/cart-summary-item/cart-summary-item.component";

const CartSummaryItems = ({ cartItems }) => (
  <CartSummaryItemsContainer>
    {cartItems.map((cartItem) => (
      <CartSummaryItem key={cartItem.productId} item={cartItem} />
    ))}
  </CartSummaryItemsContainer>
);

export default CartSummaryItems;
