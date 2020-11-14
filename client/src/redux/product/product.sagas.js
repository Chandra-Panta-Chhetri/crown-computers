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
  noMoreProductsToLoad
} from "./product.actions";
import {
  getProducts,
  getMoreProducts,
  getProductsByCategoryName,
  getMoreProductsByCategoryName,
  getProductById,
  deleteProductById,
  createNewProduct
} from "../../firebase-utils/firebase.product_utils";
import {
  selectProductsPerPage,
  selectLastVisibleDoc,
  selectProductCollection
} from "./product.selectors";
import {
  addUniqueItemsToCollection,
  capitalize,
  removeObjFromArrOfObjects
} from "../../global.utils";

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
    yield put(
      initialProductsFetchFail(
        "There was a problem with displaying the products."
      )
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
        `There was a problem loading more ${categoryName} products.`
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
    const products = yield select(selectProductCollection);
    yield deleteProductById(productId, imageUrls);
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
    yield put(deleteProductByIdFail(err.message || defaultErrMsg));
  }
}

function* createProduct({ payload: { newProductInfo, onSuccess } }) {
  const { name, price, stock } = yield newProductInfo;
  try {
    newProductInfo.price = Number(price);
    newProductInfo.stock = Number(stock);
    const products = yield select(selectProductCollection);
    const createdProduct = yield createNewProduct(newProductInfo);
    const updatedProducts = yield [...products, createdProduct];
    yield put(
      createNewProductSuccess(
        updatedProducts,
        `${capitalize(name)} has been created.`
      )
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      createNewProductFail(
        `Failed to create ${capitalize(
          name
        )}. Ensure the uploaded image(s) is a png/jpg/jpeg and each is less than 100 kb.`
      )
    );
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
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_FETCH_PRODUCT_BY_ID,
    fetchProductById
  );
}

function* watchProductDeleteById() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.START_PRODUCT_DELETE_BY_ID,
    deleteProduct
  );
}

function* watchCreateNewProduct() {
  yield takeLatest(PRODUCT_ACTION_TYPES.CREATE_NEW_PRODUCT, createProduct);
}

export default function* productSagas() {
  yield all([
    call(watchProductsFetchStart),
    call(watchProductsFetchByCategory),
    call(watchLoadMoreProducts),
    call(watchLoadMoreProductsByCategory),
    call(watchFetchProductByIdStart),
    call(watchProductDeleteById),
    call(watchCreateNewProduct)
  ]);
}
