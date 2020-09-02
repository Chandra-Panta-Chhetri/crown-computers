import { firestore } from "./firebase.config";
import { deleteAllCartItemDocInCart } from "./firebase.cart_utils";

const saleCollectionRef = firestore.collection("sales");

export const createNewSale = async (
  shoppingCart,
  paymentMethod,
  subTotal,
  isUserLoggedIn
) => {
  const createdAt = new Date();
  if (isUserLoggedIn) {
    await deleteAllCartItemDocInCart(shoppingCart);
  }
  const items = createNewCartWithImportantProductInfo(shoppingCart);
  const newSaleDocRef = await saleCollectionRef.add({
    items,
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
