import PRODUCT_ACTION_TYPES from "./product.action.types";
import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  initialProductsFetchFail,
  initialProductsFetchSuccess,
  loadingMoreProductsFail,
  loadingMoreProductsSuccess,
  noMoreToLoad
} from "./product.actions";
import {
  getProducts,
  getProductsByCategoryName,
  getMoreProducts,
  getMoreProductsByCategoryName
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
    yield put(initialProductsFetchSuccess(products, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialProductsFetchFail(
        "There was a problem with displaying the product collection"
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

function* fetchProductsByCategory({ payload: categoryName }) {
  try {
    const productsPerPage = yield select(selectProductsPerPage);
    const {
      products: productsInCategory,
      lastVisibleDoc
    } = yield getProductsByCategoryName(categoryName, productsPerPage);
    if (!productsInCategory.length) throw Error();
    yield put(initialProductsFetchSuccess(productsInCategory, lastVisibleDoc));
  } catch (err) {
    yield put(initialProductsFetchFail(`No ${categoryName} products found`));
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

function* watchProductsFetchStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_START,
    fetchProducts
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

function* watchProductsFetchByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.INITIAL_FETCH_PRODUCTS_BY_CATEGORY_START,
    fetchProductsByCategory
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

export default function* collectionSagas() {
  yield all([
    call(watchProductsFetchStart),
    call(watchProductsFetchFail),
    call(watchProductsFetchByCategory),
    call(watchLoadMoreProducts),
    call(watchLoadMoreProductsByCategory)
  ]);
}
