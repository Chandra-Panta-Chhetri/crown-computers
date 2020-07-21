import { firestore } from "./firebaseConfig";

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
