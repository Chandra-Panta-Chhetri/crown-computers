import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const auth = firebase.auth();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const firestore = firebase.firestore();

export const addUserToDb = async (user, extraData) => {
  if (!user) {
    return;
  }
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

export const addShopDataToDb = async (shopData) => {
  const categoriesCollectionRef = firestore.collection("product_categories");
  const productCollectionRef = firestore.collection("products");
  const batch = firestore.batch();
  shopData.map(async ({ title: category, items }) => {
    let categoryDocRef = categoriesCollectionRef.doc();
    batch.set(categoryDocRef, { category });
    for (let item of items) {
      const { name, imageUrl, price } = item;
      let itemDocRef = productCollectionRef.doc();
      batch.set(itemDocRef, {
        name,
        imageUrl,
        price,
        productCategoryRef: categoryDocRef
      });
    }
  });
  await batch.commit();
};

export const getShopDataFromDb = async () => {
  const shopData = {};
  const productCollectionRef = firestore.collection("products");
  const categoriesCollectionRef = firestore.collection("product_categories");
  const categoriesSnapshot = await categoriesCollectionRef.get();

  categoriesSnapshot.docs.map(async (categorySnapshot) => {
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
        ...itemSnapshot.data()
      };
      delete item.productCategoryRef;
      return item;
    });
    shopData[category] = {
      category,
      id: categorySnapshot.id,
      items: itemsInCategory,
      routePath: encodeURI(category)
    };
  });
  return shopData;
};

export default firebase;
