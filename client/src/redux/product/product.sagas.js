import PRODUCT_ACTION_TYPES from "./product.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  fetchProductByIdFail,
  fetchProductByIdSuccess,
  initialProductsFetchFail,
  initialProductsFetchSuccess,
  loadingMoreProductsFail,
  loadingMoreProductsSuccess,
  noMoreToLoad
} from "./product.actions";
import {
  getProducts,
  getMoreProducts,
  getProductsByCategoryName,
  getMoreProductsByCategoryName,
  getProductDataAndRefById
} from "../../firebase-utils/firebase.product_utils";
import { addErrorNotification } from "../notification/notification.actions";
import {
  selectProductsPerPage,
  selectLastVisibleDoc
} from "./product.selectors";

function* fetchProducts() {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const { products, lastVisibleDoc } = yield getProducts(productsPerPage);
    if (!products.length) {
      return yield put(noMoreToLoad());
    }
    yield put(initialProductsFetchSuccess(products, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialProductsFetchFail(
        "There was a problem with displaying the product collection. Please try again later"
      )
    );
  }
}

function* fetchMoreProducts() {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const { products: newProducts, lastVisibleDoc } = yield getMoreProducts(
      lastDoc,
      productsPerPage
    );
    if (!newProducts.length) {
      return yield put(noMoreToLoad());
    }
    yield put(loadingMoreProductsSuccess(newProducts, lastVisibleDoc));
  } catch (err) {
    yield put(
      loadingMoreProductsFail(
        "There was a problem loading more products. Please try again later"
      )
    );
  }
}

function* fetchProductsByCategory({
  payload: { categoryName, onNoProductsFound }
}) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const {
      products: productsInCategory,
      lastVisibleDoc
    } = yield getProductsByCategoryName(categoryName, productsPerPage);
    if (!productsInCategory.length) {
      throw Error();
    }
    yield put(initialProductsFetchSuccess(productsInCategory, lastVisibleDoc));
  } catch (err) {
    yield put(initialProductsFetchFail(`No ${categoryName} products found`));
    yield onNoProductsFound();
  }
}

function* fetchMoreProductsByCategory({ payload: categoryName }) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const {
      products: newProductsInCategory,
      lastVisibleDoc
    } = yield getMoreProductsByCategoryName(
      lastDoc,
      categoryName,
      productsPerPage
    );
    if (!newProductsInCategory.length) {
      return yield put(noMoreToLoad());
    }
    yield put(
      loadingMoreProductsSuccess(newProductsInCategory, lastVisibleDoc)
    );
  } catch (err) {
    yield put(
      loadingMoreProductsFail(
        `There was a problem loading more ${categoryName} products. Please try again later`
      )
    );
  }
}

function* handleProductsFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Collection Fetching Failed", errorMsg));
}

function* fetchProductById({ payload: { id, onNoProductFound } }) {
  try {
    const { productData } = yield getProductDataAndRefById(id);
    if (!productData) {
      throw Error();
    }
    yield put(fetchProductByIdSuccess(productData));
  } catch (err) {
    yield put(fetchProductByIdFail(`Product with ID ${id} not found`));
    yield onNoProductFound();
  }
}

function* handleFetchProductByIdFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Product Not Found", errorMsg));
}

function* watchProductsFetchStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_START,
    fetchProducts
  );
}

function* watchProductsFetchByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.INITIAL_FETCH_PRODUCTS_BY_CATEGORY_START,
    fetchProductsByCategory
  );
}

function* watchProductsFetchFail() {
  yield takeLatest(
    [
      PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
      PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_FAIL
    ],
    handleProductsFetchFail
  );
}

function* watchLoadMoreProducts() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_START,
    fetchMoreProducts
  );
}

function* watchLoadMoreProductsByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.LOAD_MORE_PRODUCTS_BY_CATEGORY_START,
    fetchMoreProductsByCategory
  );
}

function* watchFetchProductByIdStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_START,
    fetchProductById
  );
}

function* watchFetchProductByIdFail() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAIL,
    handleFetchProductByIdFail
  );
}

export default function* productSagas() {
  yield all([
    call(watchProductsFetchStart),
    call(watchProductsFetchFail),
    call(watchProductsFetchByCategory),
    call(watchLoadMoreProducts),
    call(watchLoadMoreProductsByCategory),
    call(watchFetchProductByIdStart),
    call(watchFetchProductByIdFail)
  ]);
}
