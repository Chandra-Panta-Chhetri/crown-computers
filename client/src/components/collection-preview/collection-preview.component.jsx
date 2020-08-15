import React from "react";
import { CollectionPreviewContainer } from "./collection-preview.styles";

import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ items }) => (
  <CollectionPreviewContainer>
    {items.slice(0, 4).map((item) => (
      <CollectionItem key={item.id} item={item} />
    ))}
  </CollectionPreviewContainer>
);

export default CollectionPreview;
