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

export const getProductsInCategorySnapshots = async (productCategoryRef) => {
  const getProductsInCategoryQuery = productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", 0);
  const productsSnapshot = await getProductsInCategoryQuery.get();
  return productsSnapshot.docs;
};

export const getProductsInCategory = async (
  productCategoryRef,
  categoryName
) => {
  const productsInCategorySnapshots = await getProductsInCategorySnapshots(
    productCategoryRef
  );
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
  return productsInCategory;
};

export const getProductCollection = async () => {
  const productCollection = {};
  const productCategories = await getProductCategories();
  for (let productCategory of productCategories) {
    let { category: categoryName, id } = productCategory;
    let productCategoryRef = firestore.doc(`product_categories/${id}`);
    let productsInCategory = await getProductsInCategory(
      productCategoryRef,
      categoryName
    );
    productCollection[categoryName] = {
      id,
      products: productsInCategory,
      routePath: encodeURI(categoryName)
    };
  }
  return productCollection;
};
