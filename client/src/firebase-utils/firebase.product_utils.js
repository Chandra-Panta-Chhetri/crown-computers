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
  uploadFile,
  PRODUCT_COLLECTION_NAME,
  PRODUCT_CATEGORY_COLLECTION_NAME,
  deleteMultipleUploadedFiles,
  uploadMultipleFiles
} from "./firebase.abstract_utils";

const PRODUCT_CATEGORY_IMAGES_DIRECTORY = "product_category_images";
const PRODUCT_IMAGES_DIRECTORY = "product_images";

export const getProductById = async (productId) => {
  try {
    const productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
    const product = await getDocDataByRef(productRef, true, "productId");
    product.category = await getProductCategoryName(product.productCategoryRef);
    product.productCategoryId = product.productCategoryRef.id;
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
  const imageUrl = await uploadFile(
    newCategoryInfo.image,
    PRODUCT_CATEGORY_IMAGES_DIRECTORY
  );
  delete newCategoryInfo.image;
  newCategoryInfo.imageUrl = imageUrl;
  const newProductCategoryRef = await createNewDoc(
    FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef,
    newCategoryInfo
  );
  return {
    ...newCategoryInfo,
    categoryId: newProductCategoryRef.id
  };
};

export const updateProductCategoryById = async (
  categoryId,
  updatedProductCategoryInfo
) => {
  const { image: newImage, imageUrl } = updatedProductCategoryInfo;
  const productCategoryRef = getDocRefById(
    PRODUCT_CATEGORY_COLLECTION_NAME,
    categoryId
  );
  if (newImage) {
    await deleteUploadedFile(imageUrl);
    const newImageUrl = await uploadFile(
      newImage,
      PRODUCT_CATEGORY_IMAGES_DIRECTORY
    );
    updatedProductCategoryInfo.imageUrl = newImageUrl;
  }
  delete updatedProductCategoryInfo.image;
  await updateDocDataByRef(productCategoryRef, updatedProductCategoryInfo);
  return {
    ...updatedProductCategoryInfo,
    categoryId
  };
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

export const createNewProduct = async (newProductInfo) => {
  const { images, productCategoryId } = newProductInfo;
  const imageUrls = await uploadMultipleFiles(images, PRODUCT_IMAGES_DIRECTORY);
  newProductInfo.imageUrls = imageUrls;
  newProductInfo.productCategoryRef = getDocRefById(
    PRODUCT_CATEGORY_COLLECTION_NAME,
    productCategoryId
  );
  delete newProductInfo.images;
  delete newProductInfo.productCategoryId;
  const newProductRef = await createNewDoc(
    FIRESTORE_COLLECTION_REFS.productCollectionRef,
    newProductInfo
  );
  newProductInfo.category = await getProductCategoryName(
    newProductInfo.productCategoryRef
  );
  delete newProductInfo.productCategoryRef;
  return {
    ...newProductInfo,
    productCategoryId,
    productId: newProductRef.id
  };
};

export const updateProductById = async (productId, updatedProductInfo) => {
  const {
    productCategoryId,
    images: newImages,
    imageUrls
  } = updatedProductInfo;
  const productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
  if (newImages.length) {
    await deleteMultipleUploadedFiles(imageUrls);
    const newImageUrls = await uploadMultipleFiles(
      newImages,
      PRODUCT_IMAGES_DIRECTORY
    );
    updatedProductInfo.imageUrls = newImageUrls;
  }
  delete updatedProductInfo.images;
  updatedProductInfo.productCategoryRef = getDocRefById(
    PRODUCT_CATEGORY_COLLECTION_NAME,
    productCategoryId
  );
  delete updatedProductInfo.productCategoryId;
  delete updatedProductInfo.category;
  await updateDocDataByRef(productRef, updatedProductInfo);
  updatedProductInfo.category = await getProductCategoryName(
    updatedProductInfo.productCategoryRef
  );
  delete updatedProductInfo.productCategoryRef;
  return { ...updatedProductInfo, productCategoryId, productId };
};

export const deleteProductById = async (productId, imageUrls) => {
  const productRef = getDocRefById(PRODUCT_COLLECTION_NAME, productId);
  await deleteMultipleUploadedFiles(imageUrls);
  await deleteDocByRef(productRef);
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

export const getProducts = async (productsPerPage, minStockQuantity) => {
  const paginatedProductsQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("stock", ">", minStockQuantity)
    .orderBy("stock")
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    paginatedProductsQuery
  );
  return productsAndLastVisibleDoc;
};

export const getMoreProducts = async (
  lastVisibleDoc,
  productsPerPage,
  minStockQuantity
) => {
  const nextProductsQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("stock", ">", minStockQuantity)
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
  productsPerPage,
  minStockQuantity
) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const paginatedProductsInCategoryQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", minStockQuantity)
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
  productsPerPage,
  minStockQuantity
) => {
  const productCategoryRef = await getProductCategoryRefByCategoryName(
    categoryName
  );
  const nextProductsInCategoryQuery = FIRESTORE_COLLECTION_REFS.productCollectionRef
    .where("productCategoryRef", "==", productCategoryRef)
    .where("stock", ">", minStockQuantity)
    .orderBy("stock")
    .startAfter(lastVisibleDoc)
    .limit(productsPerPage);
  const productsAndLastVisibleDoc = await excutePaginatedProductQuery(
    nextProductsInCategoryQuery
  );
  return productsAndLastVisibleDoc;
};
