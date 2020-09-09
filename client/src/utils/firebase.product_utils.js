import { firestore } from "./firebase.config";

const categoriesCollectionRef = firestore.collection("product_categories");
const productCollectionRef = firestore.collection("products");

export const getProductById = async (productId) => {
  try {
    let productRef = firestore.doc(`products/${productId}`);
    let productSnapshot = await productRef.get();
    return { productData: productSnapshot.data(), productRef };
  } catch (err) {
    return null;
  }
};

export const setProductStock = async (productId, quantityToCheckout) => {
  let {
    productData: { stock },
    productRef
  } = await getProductById(productId);
  await productRef.update({ stock: stock - quantityToCheckout });
};

export const getProductCategories = async () => {
  const productCategoriesSnapshot = await categoriesCollectionRef.get();
  const categorySnapshots = productCategoriesSnapshot.docs;
  const productCategories = categorySnapshots.map((categorySnapshot) => ({
    id: categorySnapshot.id,
    ...categorySnapshot.data()
  }));
  return productCategories;
};

export const getProductsInCategorySnapshots = async (
  productCategoryRef,
  productsPerPage
) => {
  const getProductsInCategoryQuery = productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsSnapshot = await getProductsInCategoryQuery.get();
  return productsSnapshot.docs;
};

export const getProductCategoryRefByCategoryName = async (categoryName) => {
  try {
    const getProductCategoryByNameQuery = categoriesCollectionRef.where(
      "category",
      "==",
      categoryName
    );
    const querySnapshot = await getProductCategoryByNameQuery.get();
    const productCategoryRef = querySnapshot.docs[0].ref;
    return productCategoryRef;
  } catch (err) {
    return null;
  }
};

export const getProductsInCategory = async (categoryName, productsPerPage) => {
  try {
    const productCategoryRef = await getProductCategoryRefByCategoryName(
      categoryName
    );
    const productsInCategorySnapshots = await getProductsInCategorySnapshots(
      productCategoryRef,
      productsPerPage
    );
    const lastVisibleDoc =
      productsInCategorySnapshots[productsInCategorySnapshots.length - 1];
    const productsInCategory = productsInCategorySnapshots.map(
      (productInCategorySnapshot) => {
        let product = {
          productId: productInCategorySnapshot.id,
          ...productInCategorySnapshot.data(),
          category: categoryName
        };
        delete product.productCategoryRef;
        return product;
      }
    );
    return { productsInCategory, lastVisibleDoc };
  } catch (err) {
    return [];
  }
};

export const getMoreProductsInCategory = async (
  lastDoc,
  categoryName,
  productsPerPage
) => {
  try {
    const productCategoryRef = await getProductCategoryRefByCategoryName(
      categoryName
    );
    const getMoreProductsInCategoryQuery = productCollectionRef
      .where("productCategoryRef", "==", productCategoryRef)
      .where("stock", ">", 0)
      .orderBy("stock")
      .startAfter(lastDoc)
      .limit(productsPerPage);
    const nextProductsInCategorySnapshot = await getMoreProductsInCategoryQuery.get();
    const nextProductDocSnapshots = nextProductsInCategorySnapshot.docs;
    const lastVisibleDoc =
      nextProductDocSnapshots[nextProductDocSnapshots.length - 1];
    const newProductsInCategory = nextProductDocSnapshots.map(
      (productInCategorySnapshot) => {
        let product = {
          productId: productInCategorySnapshot.id,
          ...productInCategorySnapshot.data(),
          category: categoryName
        };
        delete product.productCategoryRef;
        return product;
      }
    );
    return { newProductsInCategory, lastVisibleDoc };
  } catch (err) {
    return [];
  }
};

export const getProductCategoryName = async (productCategoryRef) => {
  const productCategorySnapshot = await productCategoryRef.get();
  return productCategorySnapshot.data().category;
};

export const getProducts = async (productsPerPage) => {
  const productsInStockQuery = productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsSnapshot = await productsInStockQuery.get();
  const productDocSnapshots = productsSnapshot.docs;
  const lastVisibleDoc = productDocSnapshots[productDocSnapshots.length - 1];
  const products = await createProductsArrayFromProductSnapshots(
    productDocSnapshots
  );
  return { products, lastVisibleDoc };
};

export const getMoreProducts = async (lastDoc, productsPerPage) => {
  const nextProductsQuery = productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .startAfter(lastDoc)
    .limit(productsPerPage);
  const nextProductsSnapshot = await nextProductsQuery.get();
  const newProductDocSnapshots = nextProductsSnapshot.docs;
  const lastVisibleDoc =
    newProductDocSnapshots[newProductDocSnapshots.length - 1];
  const newProducts = await createProductsArrayFromProductSnapshots(
    newProductDocSnapshots
  );
  return { newProducts, lastVisibleDoc };
};

const createProductsArrayFromProductSnapshots = async (productDocSnapshots) => {
  try {
    const products = [];
    for (let productDocSnapshot of productDocSnapshots) {
      let product = {
        productId: productDocSnapshot.id,
        ...productDocSnapshot.data()
      };
      product.category = await getProductCategoryName(
        product.productCategoryRef
      );
      delete product.productCategoryRef;
      products.push(product);
    }
    return products;
  } catch (err) {
    return [];
  }
};
