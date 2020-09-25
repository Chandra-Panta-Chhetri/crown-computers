import React from "react";
import {
  ChangeQuantityButton,
  RemoveItemButton,
  ItemCategory,
  ItemStockLeft,
  ItemInfoSection,
  ProductImage,
  ProductInfo,
  ProductMetaInfo,
  ProductName,
  ItemQuantityContainer,
  Icon
} from "./cart-summary-item.styles";

import { connect } from "react-redux";
import {
  removeFromCart,
  changeItemQuantity
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ item, removeItem, changeItemQuantity }) => {
  const { name, imageUrls, price, quantity, stock, category } = item;
  return (
    <tr>
      <ItemInfoSection>
        <ProductMetaInfo>
          <ProductImage src={imageUrls[0]} alt={name} />
          <ProductInfo>
            <ProductName>{name}</ProductName>
            <ItemCategory>{category}</ItemCategory>
            {stock < 10 && (
              <ItemStockLeft>Only {stock} left in stock</ItemStockLeft>
            )}
          </ProductInfo>
        </ProductMetaInfo>
      </ItemInfoSection>
      <ItemInfoSection>${price}</ItemInfoSection>
      <ItemInfoSection>
        <ItemQuantityContainer>
          <ChangeQuantityButton
            className="fa fa-minus"
            onClick={() => changeItemQuantity(item, quantity - 1)}
          ></ChangeQuantityButton>
          {quantity}
          <ChangeQuantityButton
            className="fa fa-plus"
            onClick={() => changeItemQuantity(item, quantity + 1)}
          ></ChangeQuantityButton>
        </ItemQuantityContainer>
      </ItemInfoSection>
      <ItemInfoSection>${price * quantity}</ItemInfoSection>
      <ItemInfoSection>
        <RemoveItemButton onClick={() => removeItem(item)}>
          <Icon className="fa fa-trash-alt" />
        </RemoveItemButton>
      </ItemInfoSection>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeFromCart(item)),
  changeItemQuantity: (item, newQuantity) =>
    dispatch(changeItemQuantity(item, newQuantity))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
