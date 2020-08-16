import React, { useState } from "react";
import {
  CollectionItemContainer,
  AddToCartButton,
  ItemImageContainer,
  ItemImage,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice
} from "./collection-item.styles";

import Toast from "../toast/toast.component";

import { connect } from "react-redux";
import { addToCart } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, dispatch }) => {
  const { name, imageUrl, price, category } = item;
  const [list, setList] = useState([]);

  const showToast = (type, id) => {
    let toastProperties = null;
    switch (type) {
      case "success":
        toastProperties = {
          id,
          title: "Success",
          description: "This is a success toast component",
          backgroundColor: "#5cb85c",
          icon: <i className="fas fa-check-circle fa-2x" />
        };
        break;
      case "danger":
        toastProperties = {
          id,
          title: "Danger",
          description: "This is an error toast component",
          backgroundColor: "#d9534f",
          icon: <i className="fas fa-exclamation-circle fa-2x" />
        };
        break;
      case "info":
        toastProperties = {
          id,
          title: "Info",
          description: "This is an info toast component",
          backgroundColor: "#5bc0de",
          icon: <i className="fas fa-info-circle fa-2x" />
        };
        break;
      case "warning":
        toastProperties = {
          id,
          title: "Warning",
          description: "This is a warning toast component",
          backgroundColor: "#f0ad4e",
          icon: <i className="fas fa-exclamation-triangle fa-2x" />
        };
        break;
      default:
        setList([]);
    }
    setList([...list, toastProperties]);
  };

  const handleAddToCartClick = (item) => {
    dispatch(addToCart(item));
    showToast("success", item.id);
  };

  return (
    <>
      <Toast toastList={list} autoDelete />
      <CollectionItemContainer>
        <ItemImageContainer>
          <ItemImage src={imageUrl} alt={name} />
          <AddToCartButton onClick={() => handleAddToCartClick(item)}>
            <i className="fas fa-cart-plus"></i> Add To Cart
          </AddToCartButton>
        </ItemImageContainer>
        <ItemInfoContainer>
          <ItemCategory>{category.toUpperCase()}</ItemCategory>
          <h4>{name}</h4>
          <ItemPrice>${price}</ItemPrice>
        </ItemInfoContainer>
      </CollectionItemContainer>
    </>
  );
};

export default connect()(CollectionItem);
