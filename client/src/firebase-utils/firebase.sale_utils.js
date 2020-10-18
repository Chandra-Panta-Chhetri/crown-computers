import { firestore } from "./firebase.config";
import { getLastElementInArray } from "../global.utils";

export const saleCollectionRef = firestore.collection("sales");

const populateSaleDocSnapshots = async (saleDocSnapshots) => {
  try {
    const sales = [];
    for (let saleSnapshot of saleDocSnapshots) {
      let sale = {
        saleId: saleSnapshot.id,
        ...saleSnapshot.data()
      };
      sales.push(sale);
    }
    return sales;
  } catch (err) {
    return [];
  }
};

const executePaginatedSaleQuery = async (paginatedSaleQuery) => {
  try {
    const saleSnapshot = await paginatedSaleQuery.get();
    const saleDocSnapshots = saleSnapshot.docs;
    const lastVisibleDoc = getLastElementInArray(saleDocSnapshots);
    const sales = await populateSaleDocSnapshots(saleDocSnapshots);
    return { sales, lastVisibleDoc };
  } catch (err) {
    return { sales: [], lastVisibleDoc: null };
  }
};

export const getSales = async (salesPerPage) => {
  const recentSalesQuery = saleCollectionRef
    .orderBy("createdAt", "desc")
    .limit(salesPerPage);
  const salesAndLastVisibleDoc = await executePaginatedSaleQuery(
    recentSalesQuery
  );
  return salesAndLastVisibleDoc;
};

export const getMoreSales = async (lastVisibleDoc, salesPerPage) => {
  const nextSalesQuery = saleCollectionRef
    .orderBy("createdAt", "desc")
    .startAfter(lastVisibleDoc)
    .limit(salesPerPage);
  const salesAndLastVisibleDoc = await executePaginatedSaleQuery(
    nextSalesQuery
  );
  return salesAndLastVisibleDoc;
};
