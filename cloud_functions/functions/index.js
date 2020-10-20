const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onNewSaleCreated = functions.firestore
  .document("/sales/{id}")
  .onCreate(async (snap, context) => {
    const { subTotal, itemsSold } = snap.data();
    const numProductsSold = itemsSold.length;
    const salesSummaryCollectionRef = admin
      .firestore()
      .collection("sales_summary");
    const getPreviousSalesSummary = salesSummaryCollectionRef.limit(1);
    const salesSummarySnapshot = await getPreviousSalesSummary.get();
    const saleSummaryDocSnapshot = salesSummarySnapshot.docs[0];
    if (!saleSummaryDocSnapshot) {
      console.log("creating new sale summary");
      return await salesSummaryCollectionRef.add({
        salesTotal: subTotal,
        totalProductsSold: numProductsSold
      });
    }
    const { salesTotal, totalProductsSold } = saleSummaryDocSnapshot.data();
    console.log(saleTotal, totalProductsSold, "Updating sale summary");
    return await saleSummaryDocSnapshot.ref.update({
      salesTotal: salesTotal + subTotal,
      totalProductsSold: totalProductsSold + numProductsSold
    });
  });
