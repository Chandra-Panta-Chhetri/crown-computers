import { firestore } from "./firebase.config";

const categoriesCollectionRef = firestore.collection("product_categories");
const productCollectionRef = firestore.collection("products");

export const getProductCategories = async () => {
  const productCategoriesSnapshot = await categoriesCollectionRef.get();
  const categorySnapshots = productCategoriesSnapshot.docs;
  const productCategories = categorySnapshots.map((categorySnapshot) => ({
    id: categorySnapshot.id,
    ...categorySnapshot.data()
  }));
  return productCategories;
};

export const getProductsInCategory = async (
  productCategoryRef,
  categoryName
) => {
  const getProductsInCategoryQuery = productCollectionRef.where(
    "productCategoryRef",
    "==",
    productCategoryRef
  );
  const productsSnapshot = await getProductsInCategoryQuery.get();
  const productsInCategorySnapshots = productsSnapshot.docs;
  const productsInCategory = productsInCategorySnapshots.map(
    (productInCategorySnapshot) => {
      let product = {
        id: productInCategorySnapshot.id,
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
