import React from "react";
import {
  CartSummaryItemContainer,
  ImageContainer,
  ItemImage,
  ItemInfo,
  ItemQuantityActions,
  ChangeQuantityButton,
  RemoveItemButton,
  ItemPrice,
  EditItemContainer,
  ItemCategory,
  ItemStockLeft
} from "./cart-summary-item.styles";

import { connect } from "react-redux";
import {
  removeFromCart,
  changeItemQuantity
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeItemQuantity }) => {
  const { name, imageUrl, price, quantity, stock, category } = item;
  return (
    <CartSummaryItemContainer>
      <EditItemContainer>
        <ImageContainer>
          <ItemImage src={imageUrl} alt={name} />
        </ImageContainer>
        <ItemQuantityActions>
          <ChangeQuantityButton
            className="fa fa-minus"
            onClick={() => changeItemQuantity(item, quantity - 1)}
          ></ChangeQuantityButton>
          {quantity}
          <ChangeQuantityButton
            className="fa fa-plus"
            onClick={() => changeItemQuantity(item, quantity + 1)}
          ></ChangeQuantityButton>
        </ItemQuantityActions>
      </EditItemContainer>
      <ItemInfo>
        <span>{name}</span>
        <ItemCategory>{category}</ItemCategory>
        {stock < 10 ? (
          <ItemStockLeft>Only {stock} left in stock</ItemStockLeft>
        ) : null}
        <ItemPrice>${price * quantity}</ItemPrice>
        <RemoveItemButton onClick={() => removeItem(item)}>
          <i className="fa fa-trash-alt"></i> Remove Item
        </RemoveItemButton>
      </ItemInfo>
    </CartSummaryItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeItemQuantity: (item, newQuantity) =>
    dispatch(changeItemQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
