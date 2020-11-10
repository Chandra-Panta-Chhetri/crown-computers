import {
  createNewDoc,
  deleteDocByRef,
  deleteUploadedFile,
  executePaginatedQuery,
  executeQuery,
  FIRESTORE_COLLECTION_REFS,
  getDocDataByRef,
  getDocRefById,
  populateDocSnapshots,
  updateDocDataByRef,
  uploadFileAndGetUrl,
  PRODUCT_COLLECTION_NAME,
  PRODUCT_CATEGORY_COLLECTION_NAME
} from "./firebase.abstract_utils";

const PRODUCT_CATEGORY_IMAGES_DIRECTORY = "product_category_images";
const PRODUCT_IMAGES_DIRECTORY = "product_images";

export const getProductById = async (productId) => {
  try {
    const productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
    const product = await getDocDataByRef(productRef, true, "productId");
    product.category = await getProductCategoryName(product.productCategoryRef);
    delete product.productCategoryRef;
    return product;
  } catch (err) {
    return null;
  }
};

export const updateProductStock = async (productId, quantityToCheckout) => {
  let product = await getProductById(productId);
  let productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
  await updateDocDataByRef(productRef, {
    stock: product.stock - quantityToCheckout
  });
};

export const createNewProductCategory = async (newCategoryInfo) => {
  const imageUrl = await uploadFileAndGetUrl(
    newCategoryInfo.image,
    PRODUCT_CATEGORY_IMAGES_DIRECTORY
  );
  delete newCategoryInfo.image;
  newCategoryInfo.imageUrl = imageUrl;
  const newProductCategoryRef = await createNewDoc(
    FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef,
    newCategoryInfo
  );
  const createdProductCategory = {
    ...newCategoryInfo,
    categoryId: newProductCategoryRef.id
  };
  return createdProductCategory;
};

export const updateProductCategoryById = async (
  categoryId,
  updatedProductCategoryInfo
) => {
  const productCategoryRef = getDocRefById(
    PRODUCT_CATEGORY_COLLECTION_NAME,
    categoryId
  );
  if (updatedProductCategoryInfo.image) {
    await deleteUploadedFile(updatedProductCategoryInfo.imageUrl);
    const newImageUrl = await uploadFileAndGetUrl(
      updatedProductCategoryInfo.image,
      PRODUCT_CATEGORY_IMAGES_DIRECTORY
    );
    updatedProductCategoryInfo.imageUrl = newImageUrl;
  }
  delete updatedProductCategoryInfo.image;
  await updateDocDataByRef(productCategoryRef, updatedProductCategoryInfo);
};

export const deleteAllProductsInCategory = async (productCategoryRef) => {
  const productsInCategoryQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef.where(
    "productCategoryRef",
    "==",
    productCategoryRef
  );
  const productSnapshots = await executeQuery(productsInCategoryQuery);
  for (let productSnapshot of productSnapshots) {
    let productRef = productSnapshot.ref;
    await deleteDocByRef(productRef);
  }
};

export const deleteProductCategoryById = async (
  categoryId,
  categoryImageStoragePath
) => {
  const productCategoryRef = getDocRefById(
    PRODUCT_CATEGORY_COLLECTION_NAME,
    categoryId
  );
  await deleteAllProductsInCategory(productCategoryRef);
  await deleteUploadedFile(categoryImageStoragePath);
  await deleteDocByRef(productCategoryRef);
};

export const executePaginatedCategoryQuery = async (paginatedCategoryQuery) => {
  try {
    const {
      docSnapshots: categorySnapshots,
      lastVisibleDoc
    } = await executePaginatedQuery(paginatedCategoryQuery);
    const categories = populateDocSnapshots(
      categorySnapshots,
      true,
      "categoryId"
    );
    return { categories, lastVisibleDoc };
  } catch (err) {
    return { categories: [], lastVisibleDoc: null };
  }
};

export const getProductCategories = async (categoriesPerPage) => {
  const paginatedCategoriesQuery = FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef
    .orderBy("category")
    .limit(categoriesPerPage);
  const categoriesAndLastVisibleDoc = await executePaginatedCategoryQuery(
    paginatedCategoriesQuery
  );
  return categoriesAndLastVisibleDoc;
};

export const getMoreProductCategories = async (
  lastVisibleDoc,
  categoriesPerPage
) => {
  const nextCategoriesQuery = FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef
    .orderBy("category")
    .startAfter(lastVisibleDoc)
    .limit(categoriesPerPage);
  const categoriesAndLastVisibleDoc = await executePaginatedCategoryQuery(
    nextCategoriesQuery
  );
  return categoriesAndLastVisibleDoc;
};

export const getProductCategoryRefByCategoryName = async (categoryName) => {
  try {
    const productCategoryWithNameQuery = FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef.where(
      "category",
      "==",
      categoryName
    );
    const productCategorySnapshots = await executeQuery(
      productCategoryWithNameQuery
    );
    const productCategoryRef = productCategorySnapshots[0].ref;
    return productCategoryRef;
  } catch (err) {
    return null;
  }
};

export const getProductCategoryName = async (productCategoryRef) => {
  const productCategory = await getDocDataByRef(productCategoryRef);
  return productCategory.category;
};

const populateProductDocSnapshots = async (productDocSnapshots) => {
  try {
    const products = [];
    for (let productSnapshot of productDocSnapshots) {
      let productId = productSnapshot.id;
      let product = await getProductById(productId);
      products.push(product);
    }
    return products;
  } catch (err) {
    return [];
  }
};

export const excutePaginatedProductQuery = async (paginatedProductQuery) => {
  try {
    const {
      lastVisibleDoc,
      docSnapshots: productSnapshots
    } = await executePaginatedQuery(paginatedProductQuery);
    const products = await populateProductDocSnapshots(productSnapshots);
    return { products, lastVisibleDoc };
  } catch (err) {
    return { products: [], lastVisibleDoc: null };
  }
};

export const getProducts = async (productsPerPage) => {
  const paginatedProductsQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    paginatedProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProducts = async (lastVisibleDoc, productsPerPage) => {
  const nextProductsQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("stock", ">", 0)
    .orderBy("stock")
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getProductsByCategoryName = async (
  categoryName,
  productsPerPage
) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const paginatedProductsInCategoryQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", 0)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    paginatedProductsInCategoryQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProductsByCategoryName = async (
  lastVisibleDoc,
  categoryName,
  productsPerPage
) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const nextProductsInCategoryQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
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
