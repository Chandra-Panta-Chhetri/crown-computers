const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const saleSummaryCollectionRef = admin.firestore().collection("sales_summary");

const getPreviousSaleSummaryDoc = async () => {
  const salesSummarySnapshot = await saleSummaryCollectionRef.limit(1).get();
  return salesSummarySnapshot.docs[0];
};

const createNewSaleSummary = async (saleSummaryInfo) =>
  await saleSummaryCollectionRef.add(saleSummaryInfo);

const updateSaleSummary = async (updatedSummaryInfo, saleSummaryDocRef) =>
  await saleSummaryDocRef.update(updatedSummaryInfo);

exports.onNewSaleCreated = functions.firestore
  .document("/sales/{id}")
  .onCreate(async (snap, context) => {
    const { subTotal, numItemsSold } = snap.data();
    const previousSaleSummaryDoc = await getPreviousSaleSummaryDoc();
    if (!previousSaleSummaryDoc) {
      return await createNewSaleSummary({
        salesTotal: subTotal,
        totalProductsSold: numItemsSold,
        totalNumSales: 1
      });
    }
    const {
      salesTotal,
      totalProductsSold,
      totalNumSales
    } = previousSaleSummaryDoc.data();
    return await updateSaleSummary(
      {
        salesTotal: salesTotal + subTotal,
        totalProductsSold: totalProductsSold + numItemsSold,
        totalNumSales: totalNumSales + 1
      },
      previousSaleSummaryDoc.ref
    );
  });
