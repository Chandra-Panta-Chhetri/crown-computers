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

export const getProductsInCategory = async (categoryName) => {
  try {
    const productCategoryRef = await getProductCategoryRefByCategoryName(
      categoryName
    );
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
  } catch (err) {
    return [];
  }
};

export const getProductCategoryName = async (productCategoryRef) => {
  const productCategorySnapshot = await productCategoryRef.get();
  return productCategorySnapshot.data().category;
};

export const getProducts = async () => {
  const products = [];
  const productsInStockQuery = productCollectionRef.where("stock", ">", 0);
  const productsSnapshot = await productsInStockQuery.get();
  const productDocSnapshots = productsSnapshot.docs;
  for (let productDocSnapshot of productDocSnapshots) {
    let product = {
      productId: productDocSnapshot.id,
      ...productDocSnapshot.data()
    };
    product.category = await getProductCategoryName(product.productCategoryRef);
    delete product.productCategoryRef;
    products.push(product);
  }
  return products;
};
