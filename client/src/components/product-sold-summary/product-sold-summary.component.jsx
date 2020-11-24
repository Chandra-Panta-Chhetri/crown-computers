import React from "react";
import {
  ProductSoldSummaryContainer,
  ProductCategory,
  PriceBreakdownContainer,
  TotalProductSale
} from "./product-sold-summary.styles";

import { roundNumber } from "../../global.utils";

const ProductSoldSummary = ({
  product: { name, price, category, quantity }
}) => (
  <ProductSoldSummaryContainer>
    <ProductCategory>{category}</ProductCategory>
    <PriceBreakdownContainer>
      <span>
        {quantity} x {name} (${price} ea.)
      </span>
      <TotalProductSale>${roundNumber(quantity * price)}</TotalProductSale>
    </PriceBreakdownContainer>
  </ProductSoldSummaryContainer>
);

export default ProductSoldSummary;
