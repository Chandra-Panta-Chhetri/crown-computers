import { firestore } from "./firebase.config";
import {
  deleteAllCartItemDocsInCart,
  clearUserCart
} from "./firebase.cart_utils";

const saleCollectionRef = firestore.collection("sales");

export const createNewSale = async (
  shoppingCart,
  paymentMethod,
  subTotal,
  customerInfo,
  isUserLoggedIn,
  cartId
) => {
  if (isUserLoggedIn) {
    await deleteAllCartItemDocsInCart(shoppingCart);
    await clearUserCart(cartId);
  }
  const itemsSold = createNewCartWithImportantItemInfo(shoppingCart);
  const { name, email } = customerInfo;
  const newSaleRef = await saleCollectionRef.add({
    itemsSold,
    subTotal,
    paymentMethod,
    createdAt: new Date(),
    customerInfo: { name, email }
  });
  return newSaleRef;
};

const createNewCartWithImportantItemInfo = (shoppingCart) =>
  shoppingCart.map(({ name, price, category, quantity }) => ({
    name,
    price,
    category,
    quantity
  }));
