import React from "react";
import {
  CartSummaryItemsContainer,
  TableHeading,
  TableHeadingItem
} from "./cart-summary-items.styles";

import CartSummaryItem from "../../components/cart-summary-item/cart-summary-item.component";

const CartSummaryItems = ({ cartItems }) => (
  <CartSummaryItemsContainer>
    <TableHeading>
      <tr>
        <TableHeadingItem>Product</TableHeadingItem>
        <TableHeadingItem>Unit Price</TableHeadingItem>
        <TableHeadingItem>Quantity</TableHeadingItem>
        <TableHeadingItem>Total</TableHeadingItem>
        <TableHeadingItem>Remove</TableHeadingItem>
      </tr>
    </TableHeading>
    <tbody>
      {cartItems.map((cartItem) => (
        <CartSummaryItem key={cartItem.productId} item={cartItem} />
      ))}
    </tbody>
  </CartSummaryItemsContainer>
);

export default CartSummaryItems;
