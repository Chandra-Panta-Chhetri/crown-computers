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
import CollectionItemSkeleton from "../collection-item-skeleton/collection-item-skeleton.component";

const CollectionItem = ({
  item,
  addToCart,
  history,
  intersectionCb,
  isLoading = false
}) => {
  if (isLoading) return <CollectionItemSkeleton />;
  const { name, imageUrl, price, category, stock } = item;
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
          onClick={() => history.push(`/shop/${encodeURI(category)}`)}
        >
          {category}
        </ItemCategory>
        <ItemName>{name}</ItemName>
        <ItemPrice>${price}</ItemPrice>
      </ItemInfoContainer>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item))
});

export default connect(null, mapDispatchToProps)(withRouter(CollectionItem));
