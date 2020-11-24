import {
  createNewDoc,
  executePaginatedQuery,
  executeQuery,
  FIRESTORE_COLLECTION_REFS,
  getDocDataFromSnapshot,
  updateDocDataById,
  CART_COLLECTION_NAME
} from "./firebase.abstract_utils";
import { deleteAllCartItemInArr } from "./firebase.cart_utils";

const DEFAULT_NEW_SALE_SUMMARY = {
  salesTotal: 0,
  totalProductsSold: 0,
  totalNumSales: 0
};

const populateSaleDocSnapshots = async (saleDocSnapshots) => {
  try {
    const sales = [];
    for (let saleSnapshot of saleDocSnapshots) {
      let sale = getDocDataFromSnapshot(saleSnapshot, "saleId");
      sale.createdAt = sale.createdAt.toDate();
      sales.push(sale);
    }
    return sales;
  } catch (err) {
    return [];
  }
};

const executePaginatedSaleQuery = async (paginatedSaleQuery) => {
  try {
    const {
      lastVisibleDoc,
      docSnapshots: saleDocSnapshots
    } = await executePaginatedQuery(paginatedSaleQuery);
    const sales = await populateSaleDocSnapshots(saleDocSnapshots);
    return { sales, lastVisibleDoc };
  } catch (err) {
    return { sales: [], lastVisibleDoc: null };
  }
};

export const getSales = async (salesPerPage) => {
  const recentSalesQuery = FIRESTORE_COLLECTION_REFS.saleCollectionRef
    .orderBy("createdAt", "desc")
    .limit(salesPerPage);
  const salesAndLastVisibleDoc = await executePaginatedSaleQuery(
    recentSalesQuery
  );
  return salesAndLastVisibleDoc;
};

export const getMoreSales = async (lastVisibleDoc, salesPerPage) => {
  const nextSalesQuery = FIRESTORE_COLLECTION_REFS.saleCollectionRef
    .orderBy("createdAt", "desc")
    .startAfter(lastVisibleDoc)
    .limit(salesPerPage);
  const salesAndLastVisibleDoc = await executePaginatedSaleQuery(
    nextSalesQuery
  );
  return salesAndLastVisibleDoc;
};

export const getSalesSummary = async () => {
  try {
    const saleSummaryQuery = FIRESTORE_COLLECTION_REFS.saleSummaryCollectionRef.limit(
      1
    );
    const saleSummaryDocSnapshots = await executeQuery(saleSummaryQuery);
    const saleSummary = getDocDataFromSnapshot(saleSummaryDocSnapshots[0]);
    return saleSummary;
  } catch (err) {
    await createNewDoc(
      FIRESTORE_COLLECTION_REFS.saleSummaryCollectionRef,
      DEFAULT_NEW_SALE_SUMMARY
    );
    return DEFAULT_NEW_SALE_SUMMARY;
  }
};

export const createNewSale = async (
  shoppingCart,
  paymentMethod,
  subTotal,
  customerInfo,
  isUserLoggedIn,
  cartId,
  numItemsSold
) => {
  if (isUserLoggedIn) {
    await deleteAllCartItemInArr(shoppingCart);
    await updateDocDataById(CART_COLLECTION_NAME, cartId, { cartItems: [] });
  }
  const itemsSold = createNewCartWithSelectInfo(shoppingCart);
  const { name, email } = customerInfo;
  await createNewDoc(FIRESTORE_COLLECTION_REFS.saleCollectionRef, {
    itemsSold,
    subTotal,
    paymentMethod,
    createdAt: new Date(),
    customerInfo: { name, email },
    numItemsSold
  });
};

const createNewCartWithSelectInfo = (shoppingCart) =>
  shoppingCart.map(({ name, price, category, quantity }) => ({
    name,
    price,
    category,
    quantity
  }));
