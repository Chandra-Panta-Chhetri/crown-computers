import { firestore, auth } from "./firebase.config";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createOrGetUser = async (user, extraData) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    try {
      await userRef.set({
        email: user.email,
        createdAt: new Date(),
        ...extraData
      });
    } catch (e) {
      console.log("Couldnt create user");
    }
  }
  return userRef;
};

export const getShopData = async () => {
  const shopData = {};
  const categoriesCollectionRef = firestore.collection("product_categories");
  const categoriesSnapshot = await categoriesCollectionRef.get();
  const productCollectionRef = firestore.collection("products");
  for (let categorySnapshot of categoriesSnapshot.docs) {
    const getItemsInCategoryQuery = productCollectionRef.where(
      "productCategoryRef",
      "==",
      categorySnapshot.ref
    );
    const category = categorySnapshot.data().category;
    const itemsSnapshot = await getItemsInCategoryQuery.get();
    const itemsInCategory = itemsSnapshot.docs.map((itemSnapshot) => {
      let item = {
        id: itemSnapshot.id,
        ...itemSnapshot.data(),
        category
      };
      delete item.productCategoryRef;
      return item;
    });
    shopData[category] = {
      id: categorySnapshot.id,
      items: itemsInCategory,
      routePath: encodeURI(category)
    };
  }
  return shopData;
};

// export const addShopDataToDb = async (shopData) => {
//   const categoriesCollectionRef = firestore.collection("product_categories");
//   const productCollectionRef = firestore.collection("products");
//   const batch = firestore.batch();
//   shopData.map(async ({ title: category, items }) => {
//     let categoryDocRef = categoriesCollectionRef.doc();
//     batch.set(categoryDocRef, { category });
//     for (let item of items) {
//       const { name, imageUrl, price } = item;
//       let itemDocRef = productCollectionRef.doc();
//       batch.set(itemDocRef, {
//         name,
//         imageUrl,
//         price,
//         productCategoryRef: categoryDocRef
//       });
//     }
//   });
//   await batch.commit();
// };
