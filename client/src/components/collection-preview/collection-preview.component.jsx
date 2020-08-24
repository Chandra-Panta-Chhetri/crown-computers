import React from "react";
import { CollectionPreviewContainer } from "./collection-preview.styles";

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ products }) => (
  <CollectionPreviewContainer>
    {products.slice(0, 4).map((product) => (
      <CollectionItem key={product.productId} item={product} />
    ))}
  </CollectionPreviewContainer>
);

export default CollectionPreview;
