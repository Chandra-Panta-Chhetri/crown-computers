import React from "react";
import "./collection-item.styles.scss";

import { Button } from "../button/button.component";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, dispatch }) => {
  const { name, category, imageUrl, price } = item;
  return (
    <article className="collection-item">
      <div className="img-container">
        <img className="product-img" src={imageUrl} alt={name} />
        <Button onClick={() => dispatch(addToCart(item))}>
          <i className="fas fa-cart-plus"></i> Add To Cart
        </Button>
      </div>
      <div className="body">
        <h5 className="category">{category.toUpperCase()}</h5>
        <h4 className="name">{name}</h4>
        <h4 className="price">${price}</h4>
      </div>
    </article>
  );
};

export default connect()(CollectionItem);
