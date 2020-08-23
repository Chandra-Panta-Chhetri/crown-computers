import { firestore, auth } from "./firebase.config";
import { createNewCart } from "./firebase.cart_utils";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewUser = async (userRef, newUserInfo) => {
  await userRef.set(newUserInfo);
  return await createNewCart(userRef);
};

export const createOrGetUser = async (userAuth, extraData) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    await createNewUser(userRef, {
      email: userAuth.email,
      createdAt: new Date(),
      ...extraData
    });
  }
  return userRef;
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
