import { firestore, auth } from "./firebase.config";
const categoriesCollectionRef = firestore.collection("product_categories");
const productCollectionRef = firestore.collection("products");
const cartCollectionRef = firestore.collection("carts");

export const getUserFromSession = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

export const createNewCart = async (userRef) => {
  return await cartCollectionRef.add({
    products: [],
    isWishlist: false,
    userRef
  });
};

export const getUserCartSnapshot = async (userRef) => {
  const getUserCartQuery = cartCollectionRef
    .where("userRef", "==", userRef)
    .where("isWishlist", "==", false);
  const userCartSnapshot = await getUserCartQuery.get();
  return !userCartSnapshot.empty ? userCartSnapshot.docs[0] : null;
};

export const getUserCart = async (userRef) => {
  const cartSnapshot = await getUserCartSnapshot(userRef);
  const cart = cartSnapshot.data().products;
  const populatedCart = await populateCart(cart);
  return { cart: populatedCart, cartId: cartSnapshot.id };
};

export const populateCart = async (cart) => {
  const populatedCart = [];
  for (let cartItemRef of cart) {
    let cartItemSnapshot = await cartItemRef.get();
    let { productRef, quantity } = cartItemSnapshot.data();
    let productSnapshot = await productRef.get();
    let product = productSnapshot.data();
    delete product.productCategoryRef;
    populatedCart.push({
      id: productSnapshot.id,
      cartItemId: cartItemSnapshot.id,
      ...product,
      quantity
    });
  }
  return populatedCart;
};

export const saveCartToDb = async (currentUser, cart) => {
  const userRef = firestore.doc(`users/${currentUser.id}`);
  const { id: cartId } = await getUserCartSnapshot(userRef);
  const cartRef = firestore.doc(`carts/${cartId}`);
  const depopulatedCart = await depopulateCart(cart);
  await cartRef.update({ products: depopulatedCart });
};

const depopulateCart = async (cart) => {
  const depopulateCart = [];
  for (let cartItem of cart) {
    let cartItemRef = firestore.doc(`cart_items/${cartItem.cartItemId}`);
    let productRef = firestore.doc(`products/${cartItem.id}`);
    let quantity = cartItem.quantity;
    await cartItemRef.update({ productRef, quantity });
    depopulateCart.push(cartItemRef);
  }
  return depopulateCart;
};

export const setUpNewUser = async (userRef, newUserInfo) => {
  await userRef.set(newUserInfo);
  return await createNewCart(userRef);
};

export const createOrGetUser = async (userAuth, extraData) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    await setUpNewUser(userRef, {
      email: userAuth.email,
      createdAt: new Date(),
      ...extraData
    });
  }
  return userRef;
};

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
