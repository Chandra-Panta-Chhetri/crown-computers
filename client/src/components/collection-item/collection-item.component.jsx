import React from "react";
import {
  CollectionItemContainer,
  AddToCartButton,
  ItemImageContainer,
  ItemImage,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice,
  ItemStock,
  ItemName
} from "./collection-item.styles";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const CollectionItem = ({ item, addToCart, history, intersectionCb }) => {
  const { name, imageUrl, price, category, stock, productId } = item;
  return (
    <CollectionItemContainer ref={intersectionCb}>
      <ItemImageContainer>
        <ItemImage src={imageUrl} alt={name} />
        <ItemStock>In Stock: {stock}</ItemStock>
        <AddToCartButton onClick={() => addToCart(item)}>
          Add To Cart
        </AddToCartButton>
      </ItemImageContainer>
      <ItemInfoContainer>
        <ItemCategory
          onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
        >
          {category}
        </ItemCategory>
        <ItemName onClick={() => history.push(`/shop/${productId}`)}>
          {name}
        </ItemName>
        <ItemPrice>${price}</ItemPrice>
      </ItemInfoContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(CollectionItem);
