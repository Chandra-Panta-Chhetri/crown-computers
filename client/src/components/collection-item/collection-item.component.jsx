import React from "react";
import {
  CollectionItemContainer,
  AddToCartButton,
  ItemImageContainer,
  ItemImage,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice,
  ItemStock
} from "./collection-item.styles";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { withRouter } from "react-router-dom";

const CollectionItem = ({ item, addToCart, history }) => {
  const { name, imageUrl, price, category, stock } = item;
  return (
    <CollectionItemContainer>
      <ItemImageContainer>
        <ItemImage src={imageUrl} alt={name} />
        <AddToCartButton onClick={() => addToCart(item)}>
          Add To Cart
        </AddToCartButton>
      </ItemImageContainer>
      <ItemInfoContainer>
        <ItemCategory
          onClick={() => history.push(`/shop/${encodeURI(category)}`)}
        >
          {category.toUpperCase()}
        </ItemCategory>
        <h4>{name}</h4>
        <ItemPrice>${price}</ItemPrice>
        <ItemStock>In Stock: {stock}</ItemStock>
      </ItemInfoContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(null, mapDispatchToProps)(withRouter(CollectionItem));
