import PRODUCT_ACTION_TYPES from "./product.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  createNewProductFail,
  createNewProductSuccess,
  deleteProductByIdFail,
  deleteProductByIdSuccess,
  fetchProductByIdFail,
  fetchProductByIdSuccess,
  initialProductsFetchFail,
  initialProductsFetchSuccess,
  loadingMoreProductsFail,
  loadingMoreProductsSuccess,
  noMoreProductsToLoad,
  updateProductInfoFail,
  updateProductInfoSuccess
} from "./product.actions";
import {
  getProducts,
  getMoreProducts,
  getProductsByCategoryName,
  getMoreProductsByCategoryName,
  getProductById,
  deleteProductById,
  createNewProduct,
  updateProductById
} from "../../firebase-utils/firebase.product_utils";
import {
  selectProductsPerPage,
  selectLastVisibleDoc,
  selectProductCollection
} from "./product.selectors";
import {
  addUniqueItemsToCollection,
  capitalize,
  removeObjFromArrOfObjects,
  updateObjInArrOfObjects
} from "../../global.utils";
import { analytics } from "../../firebase-utils/firebase.config";

function* fetchProducts({ payload: minStockQuantity }) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const { products, lastVisibleDoc } = yield getProducts(
      productsPerPage,
      minStockQuantity
    );
    if (!products.length) {
      return yield put(noMoreProductsToLoad());
    }
    yield put(initialProductsFetchSuccess(products, lastVisibleDoc));
  } catch (err) {
    yield analytics.logEvent("product_load_fail", { err: err.message });
    yield put(
      initialProductsFetchFail("There was a problem displaying the products.")
    );
  }
}

function* fetchMoreProducts({ payload: minStockQuantity }) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const { products: newProducts, lastVisibleDoc } = yield getMoreProducts(
      lastDoc,
      productsPerPage,
      minStockQuantity
    );
    if (!newProducts.length) {
      return yield put(noMoreProductsToLoad());
    }
    const prevProducts = yield select(selectProductCollection);
    const updatedProducts = yield addUniqueItemsToCollection(
      prevProducts,
      newProducts,
      "productId"
    );
    yield put(loadingMoreProductsSuccess(updatedProducts, lastVisibleDoc));
  } catch (err) {
    yield analytics.logEvent("product_load_more_fail", { err: err.message });
    yield put(
      loadingMoreProductsFail("There was a problem loading more products.")
    );
  }
}

function* fetchProductsByCategory({
  payload: { categoryName, onFail, minStockQuantity }
}) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const {
      products: productsInCategory,
      lastVisibleDoc
    } = yield getProductsByCategoryName(
      categoryName,
      productsPerPage,
      minStockQuantity
    );
    if (!productsInCategory.length) {
      throw Error();
    }
    yield put(initialProductsFetchSuccess(productsInCategory, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialProductsFetchFail(
        `There are no products in ${capitalize(categoryName)} yet.`
      )
    );
    yield onFail();
  }
}

function* fetchMoreProductsByCategory({
  payload: { categoryName, minStockQuantity }
}) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const {
      products: newProductsInCategory,
      lastVisibleDoc
    } = yield getMoreProductsByCategoryName(
      lastDoc,
      categoryName,
      productsPerPage,
      minStockQuantity
    );
    if (!newProductsInCategory.length) {
      return yield put(noMoreProductsToLoad());
    }
    yield put(
      loadingMoreProductsSuccess(newProductsInCategory, lastVisibleDoc)
    );
  } catch (err) {
    yield put(
      loadingMoreProductsFail(
        `There was a problem loading more ${capitalize(categoryName)} products.`
      )
    );
  }
}

function* fetchProductById({ payload: { id, onFail } }) {
  try {
    const product = yield getProductById(id);
    if (!product) {
      throw Error();
    }
    yield put(fetchProductByIdSuccess(product));
  } catch (err) {
    yield put(
      fetchProductByIdFail(
        `The requested product has been removed or does not exist`
      )
    );
    yield onFail();
  }
}

function* deleteProduct({ payload: { productToDelete } }) {
  const { name, productId, imageUrls } = yield productToDelete;
  try {
    yield deleteProductById(productId, imageUrls);
    const products = yield select(selectProductCollection);
    const updatedProducts = yield removeObjFromArrOfObjects(
      "productId",
      productId,
      products,
      `${capitalize(name)} has been deleted or does not exist.`
    );
    yield put(
      deleteProductByIdSuccess(
        updatedProducts,
        `${capitalize(name)} has been deleted.`
      )
    );
  } catch (err) {
    let defaultErrMsg = yield `There was a problem deleting ${capitalize(
      name
    )}.`;
    yield analytics.logEvent("delete_product_fail", {
      err: err.message || defaultErrMsg,
      productToDelete
    });
    yield put(deleteProductByIdFail(err.message || defaultErrMsg));
  }
}

function* createProduct({ payload: { newProductInfo, onSuccess } }) {
  const { name } = yield newProductInfo;
  try {
    newProductInfo.price = yield Number(newProductInfo.price);
    newProductInfo.stock = yield Number(newProductInfo.stock);
    const newProduct = yield createNewProduct({ ...newProductInfo });
    const products = yield select(selectProductCollection);
    const updatedProducts = yield [...products, newProduct];
    yield put(
      createNewProductSuccess(
        updatedProducts,
        `${capitalize(name)} has been created.`
      )
    );
    yield onSuccess();
  } catch (err) {
    yield analytics.logEvent("create_product_fail", {
      err: err.message,
      newProductInfo
    });
    yield put(
      createNewProductFail(
        `Failed to create ${capitalize(
          name
        )}. Ensure the uploaded image(s) is a png/jpg/jpeg and each is less than 100 kb.`
      )
    );
  }
}

function* updateProductInfoById({
  payload: { updatedProductInfo, productId, onSuccess }
}) {
  try {
    updatedProductInfo.price = yield Number(updatedProductInfo.price);
    updatedProductInfo.stock = yield Number(updatedProductInfo.stock);
    yield delete updatedProductInfo.productId;
    const updatedProduct = yield updateProductById(productId, {
      ...updatedProductInfo
    });
    const products = yield select(selectProductCollection);
    const updatedProducts = yield updateObjInArrOfObjects(
      "productId",
      productId,
      products,
      "There was a problem updating the product as it may have been deleted or does not exist.",
      updatedProduct
    );
    yield put(
      updateProductInfoSuccess(updatedProducts, "Product info has been updated")
    );
    yield onSuccess();
  } catch (err) {
    let defaultErrMsg = yield "There was a problem updating the product. Please try again later.";
    yield analytics.logEvent("update_product_fail", {
      err: err.message || defaultErrMsg,
      updatedProductInfo,
      productId
    });
    yield put(updateProductInfoFail(err.message || defaultErrMsg));
  }
}

function* watchProductsFetchStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_INITIAL_PRODUCTS_FETCH,
    fetchProducts
  );
}

function* watchProductsFetchByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_INITIAL_FETCH_PRODUCTS_BY_CATEGORY,
    fetchProductsByCategory
  );
}

function* watchLoadMoreProducts() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS,
    fetchMoreProducts
  );
}

function* watchLoadMoreProductsByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_LOADING_MORE_PRODUCTS_BY_CATEGORY,
    fetchMoreProductsByCategory
  );
}

function* watchFetchProductByIdStart() {
  yield takeLatest(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID, fetchProductById);
}

function* watchProductDeleteById() {
  yield takeLatest(PRODUCT_ACTION_TYPES.DELETE_PRODUCT_BY_ID, deleteProduct);
}

function* watchCreateNewProduct() {
  yield takeLatest(PRODUCT_ACTION_TYPES.CREATE_NEW_PRODUCT, createProduct);
}

function* watchUpdateProductInfo() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_BY_ID,
    updateProductInfoById
  );
}

export default function* productSagas() {
  yield all([
    call(watchProductsFetchStart),
    call(watchProductsFetchByCategory),
    call(watchLoadMoreProducts),
    call(watchLoadMoreProductsByCategory),
    call(watchFetchProductByIdStart),
    call(watchProductDeleteById),
    call(watchCreateNewProduct),
    call(watchUpdateProductInfo)
  ]);
}
