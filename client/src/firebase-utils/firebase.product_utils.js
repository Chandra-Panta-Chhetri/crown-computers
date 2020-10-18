import { firestore } from "./firebase.config";
import { getLastElementInArray } from "../global.utils";

const categoriesCollectionRef = firestore.collection("product_categories");
const productCollectionRef = firestore.collection("products");

export const getProductDataAndRefById = async (productId) => {
  try {
    let productRef = firestore.doc(`products/${productId}`);
    let productDocSnapshot = await productRef.get();
    let productData = {
      productId: productDocSnapshot.id,
      ...productDocSnapshot.data()
    };
    let productCategory = await getProductCategoryName(
      productData.productCategoryRef
    );
    productData.category = productCategory;
    delete productData.productCategoryRef;
    return {
      productData,
      productRef
    };
  } catch (err) {
    return null;
  }
};

export const updateProductStock = async (productId, quantityToCheckout) => {
  let {
    productData: { stock },
    productRef
  } = await getProductDataAndRefById(productId);
  await productRef.update({ stock: stock - quantityToCheckout });
};

export const getProductCategories = async () => {
  const categoriesSnapshot = await categoriesCollectionRef.get();
  const categoryDocSnapshots = categoriesSnapshot.docs;
  const productCategories = categoryDocSnapshots.map((categorySnapshot) => ({
    id: categorySnapshot.id,
    ...categorySnapshot.data()
  }));
  return productCategories;
};

export const getProductCategoryRefByCategoryName = async (categoryName) => {
  try {
    const productCategoryByNameQuery = categoriesCollectionRef.where(
      "category",
      "==",
      categoryName
    );
    const productCategoriesSnapshot = await productCategoryByNameQuery.get();
    const productCategoryRef = productCategoriesSnapshot.docs[0].ref;
    return productCategoryRef;
  } catch (err) {
    return null;
  }
};

export const getProductCategoryName = async (productCategoryRef) => {
  const productCategorySnapshot = await productCategoryRef.get();
  return productCategorySnapshot.data().category;
};

const populateProductDocSnapshots = async (productDocSnapshots) => {
  try {
    const products = [];
    for (let productSnapshot of productDocSnapshots) {
      let product = {
        productId: productSnapshot.id,
        ...productSnapshot.data()
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

export const excutePaginatedProductQuery = async (paginatedProductQuery) => {
  try {
    const productSnapshot = await paginatedProductQuery.get();
    const productDocSnapshots = productSnapshot.docs;
    const lastVisibleDoc = getLastElementInArray(productDocSnapshots);
    const products = await populateProductDocSnapshots(productDocSnapshots);
    return { products, lastVisibleDoc };
  } catch (err) {
    return { products: [], lastVisibleDoc: null };
  }
};

export const getProducts = async (productsPerPage) => {
  const productsInStockQuery = productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    productsInStockQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProducts = async (lastVisibleDoc, productsPerPage) => {
  const nextProductsQuery = productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getProductsByCategory = async (categoryName, productsPerPage) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const productsInCategoryQuery = productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    productsInCategoryQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProductsByCategory = async (
  lastVisibleDoc,
  categoryName,
  productsPerPage
) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const nextProductsInCategoryQuery = productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", 0)
    .orderBy("stock")
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsInCategoryQuery
  );
  return productsAndLastVisibleDoc;
};
