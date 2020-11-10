import React from "react";
import {
  ProductSoldSummaryContainer,
  ProductCategory,
  PriceBreakdownContainer
} from "./product-sold-summary.styles";

import { roundNumber } from "../../global.utils";

const ProductSoldSummary = ({
  product: { name, price, category, quantity }
}) => (
  <ProductSoldSummaryContainer>
    <ProductCategory>{category}</ProductCategory>
    <PriceBreakdownContainer>
      <span>
        {quantity} x {name} @ ${price}
      </span>
      <span>${roundNumber(quantity * price)}</span>
    </PriceBreakdownContainer>
  </ProductSoldSummaryContainer>
);

export default ProductSoldSummary;
