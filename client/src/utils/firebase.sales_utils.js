import { firestore } from "./firebase.config";
import {
  deleteAllCartItemDocInCart,
  clearUserSavedCart
} from "./firebase.cart_utils";

const saleCollectionRef = firestore.collection("sales");

export const createNewSale = async (
  shoppingCart,
  paymentMethod,
  subTotal,
  isUserLoggedIn,
  cartId
) => {
  const createdAt = new Date();
  if (isUserLoggedIn) {
    await deleteAllCartItemDocInCart(shoppingCart);
    clearUserSavedCart(cartId);
  }
  const itemsSold = createNewCartWithImportantProductInfo(shoppingCart);
  const newSaleDocRef = await saleCollectionRef.add({
    itemsSold,
    subTotal,
    paymentMethod,
    createdAt
  });
  return newSaleDocRef;
};

const createNewCartWithImportantProductInfo = (shoppingCart) => {
  return shoppingCart.map(({ name, price, category, quantity }) => ({
    name,
    price,
    category,
    quantity
  }));
};
