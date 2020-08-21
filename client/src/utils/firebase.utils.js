import { firestore, auth } from "./firebase.config";

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewCart = async (userRef) => {
  const cartCollectionRef = firestore.collection("carts");
  await cartCollectionRef.add({ products: [], isWishlist: false, userRef });
};

export const saveCartToDb = async (currentUser, cart) => {};

export const createOrGetUser = async (user, extraData) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    await userRef.set({
      email: user.email,
      createdAt: new Date(),
      ...extraData
    });
    await createNewCart(userRef);
  }
  return userRef;
};

export const getShopCategories = async () => {
  const categoriesCollectionRef = firestore.collection("product_categories");
  const categoriesSnapShot = await categoriesCollectionRef.get();
  return categoriesSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
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
