import React from "react";
import {
  ChangeQuantityButton,
  RemoveItemButton,
  ProductCategory,
  ProductStockLeft,
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

  const increaseItemQuantity = (e) => changeItemQuantity(item, quantity + 1);

  const decreaseItemQuantity = (e) =>
    quantity - 1 > 0 ? changeItemQuantity(item, quantity - 1) : "";

  return (
    <tr>
      <ItemInfoSection>
        <ProductMetaInfo>
          <ProductImage src={imageUrls[0]} alt={name} />
          <ProductInfo>
            <ProductCategory>{category}</ProductCategory>
            <ProductName>{name}</ProductName>
            {stock < 10 && (
              <ProductStockLeft>Only {stock} left in stock</ProductStockLeft>
            )}
          </ProductInfo>
        </ProductMetaInfo>
      </ItemInfoSection>
      <ItemInfoSection>${price}</ItemInfoSection>
      <ItemInfoSection>
        <ItemQuantityContainer>
          <ChangeQuantityButton
            className="fa fa-minus"
            onClick={decreaseItemQuantity}
          ></ChangeQuantityButton>
          {quantity}
          <ChangeQuantityButton
            className="fa fa-plus"
            onClick={increaseItemQuantity}
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
