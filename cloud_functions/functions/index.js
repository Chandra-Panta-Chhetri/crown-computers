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
    const { subTotal, itemsSold } = snap.data();
    const numProductsSold = itemsSold.length;
    const previousSaleSummaryDoc = await getPreviousSaleSummaryDoc();
    if (!previousSaleSummaryDoc) {
      return await createNewSaleSummary({
        salesTotal: subTotal,
        totalProductsSold: numProductsSold
      });
    }
    const { salesTotal, totalProductsSold } = previousSaleSummaryDoc.data();
    return await updateSaleSummary(
      {
        salesTotal: salesTotal + subTotal,
        totalProductsSold: totalProductsSold + numProductsSold
      },
      previousSaleSummaryDoc.ref
    );
  });
