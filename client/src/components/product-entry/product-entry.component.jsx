import React from "react";
import { ProductEntryContainer } from "./product-entry.styles";

import Card from "../card/card.component";

const ProductEntry = ({ product, intersectionCb }) => {
  const {
    category,
    description,
    name,
    price,
    stock,
    imageUrls,
    specifications
  } = product;
  return (
    <ProductEntryContainer ref={intersectionCb}>
      <Card>
        <p>Test</p>
      </Card>
    </ProductEntryContainer>
  );
};

export default ProductEntry;
