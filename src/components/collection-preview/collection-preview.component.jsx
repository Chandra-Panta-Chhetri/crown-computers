import React from "react";
import "./collection-preview.styles.scss";

import CollectionItem from "../collection-item/collection-item.component";

export const CollectionPreview = ({ items }) => (
  <div className="collection-preview">
    {items.slice(0, 4).map((item) => (
      <CollectionItem key={item.id} item={item} />
    ))}
  </div>
);
