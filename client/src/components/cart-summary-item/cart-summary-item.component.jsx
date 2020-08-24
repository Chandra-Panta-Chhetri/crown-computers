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
import {
  removeFromCart,
  changeItemQuantity
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeItemQuantity }) => {
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
              onClick={() => changeItemQuantity(item, quantity - 1)}
            ></ItemChangeQuantityIcon>
            {quantity}
            <ItemChangeQuantityIcon
              className="fa fa-plus"
              onClick={() => changeItemQuantity(item, quantity + 1)}
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
  changeItemQuantity: (item, newQuantity) =>
    dispatch(changeItemQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
