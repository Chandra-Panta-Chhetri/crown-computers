import React from "react";
import "./collection-preview.styles.scss";
import { CollectionItem } from "../collection-item/collection-item.component.jsx";

export const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items.slice(0, 4).map(({ id, ...otherItemFields }) => {
          return <CollectionItem key={id} {...otherItemFields} />;
        })}
      </div>
    </div>
  );
};
