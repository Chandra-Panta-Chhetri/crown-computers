import React from "react";
import "./collection-preview.styles.scss";

import { CollectionItem } from "../collection-item/collection-item.component";

export const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    {items.slice(0, 4).map(({ id, ...otherItemFields }) => (
      <CollectionItem
        key={id}
        category={title.toUpperCase()}
        {...otherItemFields}
      />
    ))}
  </div>
);
