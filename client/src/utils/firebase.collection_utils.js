import { firestore } from "./firebase.config";

const categoriesCollectionRef = firestore.collection("product_categories");
const productCollectionRef = firestore.collection("products");

export const getShopCategories = async () => {
  const categoriesSnapShot = await categoriesCollectionRef.get();
  return categoriesSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getShopData = async () => {
  const shopData = {};
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
