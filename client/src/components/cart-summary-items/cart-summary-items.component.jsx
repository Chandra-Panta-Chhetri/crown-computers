import React from "react";
import {
  CartSummaryItemsContainer,
  TableHeadings,
  TableHeading
} from "./cart-summary-items.styles";
import { ResponsiveTableContainer } from "../wish-list-detail/wish-list-detail.styles";

import CartSummaryItem from "../../components/cart-summary-item/cart-summary-item.component";

const CartSummaryItems = ({ cartItems }) => (
  <ResponsiveTableContainer>
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
  </ResponsiveTableContainer>
);

export default CartSummaryItems;
