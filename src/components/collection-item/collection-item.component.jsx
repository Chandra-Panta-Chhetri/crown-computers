import React from "react";
import "./collection-item.styles.scss";

export const CollectionItem = ({ name, category, imageUrl, price }) => {
  return (
    <article className="collection-item">
      <img className="image" src={imageUrl} alt={`${name}`} />
      <div className="body">
        <h5 className="category">{category}</h5>
        <h4 className="name">{name}</h4>
        <h4 className="price">${price}</h4>
      </div>
    </article>
  );
};
