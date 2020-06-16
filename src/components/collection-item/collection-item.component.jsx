import React from "react";
import "./collection-item.styles.scss";

import { Button } from "../button/button.component";

export const CollectionItem = ({ name, category, imageUrl, price }) => (
  <article className="collection-item">
    <div className="img-container">
      <img className="product-img" src={imageUrl} alt={name} />
      <Button onClick={() => console.log("add btn clicked")}>
        <i className="fas fa-cart-plus"></i> Add To Cart
      </Button>
    </div>
    <div className="body">
      <h5 className="category">{category}</h5>
      <h4 className="name">{name}</h4>
      <h4 className="price">${price}</h4>
    </div>
  </article>
);
