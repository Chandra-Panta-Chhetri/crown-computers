import {
  deleteDocById,
  CART_ITEM_COLLECTION_NAME
} from "../../firebase-utils/firebase.abstract_utils";
import { createNewCartItem } from "../../firebase-utils/firebase.cart_utils";

const updateItemQuantityInCart = (
  shoppingCart,
  itemStock,
  newQuantity,
  itemIndex
) => {
  if (!hasEnoughInStock(itemStock, newQuantity)) throw Error();
  shoppingCart[itemIndex] = {
    ...shoppingCart[itemIndex],
    quantity: newQuantity
  };
  return [...shoppingCart];
};

export const addToCart = async (shoppingCart, item, isLoggedIn) => {
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.productId === item.productId
  );

  if (itemIndex === -1) {
    if (!isLoggedIn) {
      return [...shoppingCart, { ...item, quantity: 1 }];
    }
    const { id: newCartItemId } = await createNewCartItem(item.productId);
    return [
      ...shoppingCart,
      { ...item, quantity: 1, cartItemId: newCartItemId }
    ];
  }
  const newQuantity = shoppingCart[itemIndex].quantity + 1;
  const updatedCart = updateItemQuantityInCart(
    shoppingCart,
    item.stock,
    newQuantity,
    itemIndex
  );
  return updatedCart;
};

export const changeItemQuantity = (shoppingCart, { item, newQuantity }) => {
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.productId === item.productId
  );
  if (itemIndex !== -1) {
    const updatedCart = updateItemQuantityInCart(
      shoppingCart,
      item.stock,
      newQuantity,
      itemIndex
    );
    return updatedCart;
  }
  return shoppingCart;
};

export const removeFromCart = async (shoppingCart, item, isLoggedIn) => {
  if (isLoggedIn) {
    await deleteDocById(CART_ITEM_COLLECTION_NAME, item.cartItemId);
  }
  return shoppingCart.filter(
    (cartItem) => cartItem.productId !== item.productId
  );
};

const hasEnoughInStock = (stock, quantity) => quantity <= stock;
