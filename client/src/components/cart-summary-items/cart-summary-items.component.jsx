import React from "react";
import {
  CartSummaryItemsContainer,
  TableHeadings,
  TableHeading
} from "./cart-summary-items.styles";

import CartSummaryItem from "../../components/cart-summary-item/cart-summary-item.component";

const CartSummaryItems = ({ cartItems }) => (
  <CartSummaryItemsContainer>
    <TableHeadings>
      <tr>
        <TableHeading>Product</TableHeading>
        <TableHeading>Unit Price</TableHeading>
        <TableHeading>Quantity</TableHeading>
        <TableHeading>Total</TableHeading>
        <TableHeading>Remove</TableHeading>
      </tr>
    </TableHeadings>
    <tbody>
      {cartItems.map((cartItem) => (
        <CartSummaryItem key={cartItem.productId} item={cartItem} />
      ))}
    </tbody>
  </CartSummaryItemsContainer>
);

export default CartSummaryItems;
