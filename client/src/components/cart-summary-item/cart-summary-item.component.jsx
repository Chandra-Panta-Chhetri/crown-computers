import React from "react";
import {
  CartSummaryItemContainer,
  ItemContent,
  ImageContainer,
  ItemImage,
  ItemActions,
  ItemQuantity,
  ItemChangeQuantityIcon,
  ItemRemoveContainer,
  ItemPrice
} from "./cart-summary-item.styles";

import { connect } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeQuantity }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <CartSummaryItemContainer>
      <ItemContent>
        <ImageContainer>
          <ItemImage src={imageUrl} alt={name} />
        </ImageContainer>
        <ItemActions>
          <span>{name}</span>
          <ItemQuantity>
            <ItemChangeQuantityIcon
              className="fa fa-minus"
              onClick={() => changeQuantity(item, quantity - 1)}
            ></ItemChangeQuantityIcon>
            {quantity}
            <ItemChangeQuantityIcon
              className="fa fa-plus"
              onClick={() => changeQuantity(item, quantity + 1)}
            ></ItemChangeQuantityIcon>
          </ItemQuantity>
          <ItemRemoveContainer
            className="summary-item-remove"
            onClick={() => removeItem(item)}
          >
            <i className="fas fa-trash"></i> Remove
          </ItemRemoveContainer>
        </ItemActions>
      </ItemContent>
      <ItemPrice>${price * quantity}</ItemPrice>
    </CartSummaryItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeQuantity: (item, newQuantity) =>
    dispatch(changeQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
