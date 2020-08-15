import React from "react";
import {
  CollectionItemContainer,
  AddToCartButton,
  ItemImageContainer,
  ItemImage,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice
} from "./collection-item.styles";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, dispatch }) => {
  const { name, imageUrl, price, category } = item;
  return (
    <CollectionItemContainer>
      <ItemImageContainer>
        <ItemImage src={imageUrl} alt={name} />
        <AddToCartButton onClick={() => dispatch(addToCart(item))}>
          <i className="fas fa-cart-plus"></i> Add To Cart
        </AddToCartButton>
      </ItemImageContainer>
      <ItemInfoContainer>
        <ItemCategory>{category.toUpperCase()}</ItemCategory>
        <h4>{name}</h4>
        <ItemPrice>${price}</ItemPrice>
      </ItemInfoContainer>
    </CollectionItemContainer>
  );
};

export default connect()(CollectionItem);
