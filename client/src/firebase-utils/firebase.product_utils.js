import { firestore, fileStorage } from "./firebase.config";
import { getLastElementInArray } from "../global.utils";

const PRODUCT_CATEGORY_IMAGES_DIRECTORY = "product_category_images";
const PRODUCT_IMAGES_DIRECTORY = "product_images";

const categoryCollectionRef = firestore.collection("product_categories");
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

export const uploadImage = async (image, directoryToSaveImage = "") =>
  new Promise((resolve, reject) => {
    const uniqueImageName = new Date().getTime() + image.name;
    const imageStoragePath = `${directoryToSaveImage}/${uniqueImageName}`;
    const uploadTask = fileStorage.ref(imageStoragePath).put(image);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        reject(err);
      },
      () => {
        fileStorage
          .ref()
          .child(imageStoragePath)
          .getDownloadURL()
          .then((imageUrl) => {
            resolve(imageUrl);
          })
          .catch((err) => {
            reject(err);
          });
      }
    );
  });

export const deleteUploadedImage = async (imageStorageAbsolutePath) => {
  const imageRef = fileStorage.refFromURL(imageStorageAbsolutePath);
  await imageRef.delete();
};

export const createNewProductCategory = async (newCategoryInfo) => {
  const imageUrl = await uploadImage(
    newCategoryInfo.image,
    PRODUCT_CATEGORY_IMAGES_DIRECTORY
  );
  delete newCategoryInfo.image;
  newCategoryInfo.imageUrl = imageUrl;
  const newProductCategoryRef = await categoryCollectionRef.add(
    newCategoryInfo
  );
  return { categoryId: newProductCategoryRef.id, ...newCategoryInfo };
};

export const updateProductCategoryById = async (
  categoryId,
  updatedProductCategoryInfo
) => {
  const productCategoryRef = firestore.doc(`product_categories/${categoryId}`);
  if (updatedProductCategoryInfo.image) {
    await deleteUploadedImage(updatedProductCategoryInfo.imageUrl);
    const newImageUrl = await uploadImage(
      updatedProductCategoryInfo.image,
      PRODUCT_CATEGORY_IMAGES_DIRECTORY
    );
    delete newCategoryInfo.image;
    updatedProductCategoryInfo.imageUrl = newImageUrl;
  }
  await productCategoryRef.update(updatedProductCategoryInfo);
};

export const deleteProductCategoryById = async (
  categoryId,
  categoryImageStoragePath
) => {
  const productCategoryRef = firestore.doc(`product_categories/${categoryId}`);
  const productSnapshots = await getProductSnapshotsByCategoryRef(
    productCategoryRef
  );
  for (let productSnapshot of productSnapshots) {
    await productSnapshot.ref.delete();
  }
  await deleteUploadedImage(categoryImageStoragePath);
  await productCategoryRef.delete();
};

export const executePaginatedCategoryQuery = async (paginatedCategoryQuery) => {
  try {
    const categoriesSnapshot = await paginatedCategoryQuery.get();
    const categoryDocSnapshots = categoriesSnapshot.docs;
    const lastVisibleDoc = getLastElementInArray(categoryDocSnapshots);
    const productCategories = categoryDocSnapshots.map((categorySnapshot) => ({
      ...categorySnapshot.data(),
      categoryId: categorySnapshot.id
    }));
    return { categories: productCategories, lastVisibleDoc };
  } catch (err) {
    return { categories: [], lastVisibleDoc: null };
  }
};

export const getProductCategories = async (categoriesPerPage) => {
  const paginatedCategoriesQuery = categoryCollectionRef
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
  const nextCategoriesQuery = categoryCollectionRef
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
    const productCategoryByNameQuery = categoryCollectionRef.where(
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

export const getProductSnapshotsByCategoryRef = async (productCategoryRef) => {
  const productsWithCategoryId = productCollectionRef.where(
    "productCategoryRef",
    "==",
    productCategoryRef
  );
  const productsSnapshot = await productsWithCategoryId.get();
  return productsSnapshot.docs;
};

export const getProductsByCategoryName = async (
  categoryName,
  productsPerPage
) => {
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

export const getMoreProductsByCategoryName = async (
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
