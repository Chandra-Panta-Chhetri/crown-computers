import PRODUCT_ACTION_TYPES from "./product.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import { productsFetchFail, productsFetchSuccess } from "./product.actions";
import {
  getProducts,
  getProductsInCategory
} from "../../utils/firebase.product_utils";
import { addErrorNotification } from "../notification/notification.actions";

function* fetchProducts() {
  try {
    const products = yield getProducts();
    yield put(productsFetchSuccess(products));
  } catch (err) {
    yield put(
      productsFetchFail(
        "There was a problem with displaying the product collection"
      )
    );
  }
}

function* fetchProductsByCategory({ payload: categoryName }) {
  try {
    const products = yield getProductsInCategory(categoryName);
    if (!products.length) throw Error();
    yield put(productsFetchSuccess(products));
  } catch (err) {
    yield put(productsFetchFail(`No ${categoryName} products found`));
  }
}

function* handleProductsFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Collection Fetching Failed", errorMsg));
}

function* watchProductsFetchStart() {
  yield takeLatest(PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_START, fetchProducts);
}

function* watchProductsFetchByCategory() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_BY_CATEGORY,
    fetchProductsByCategory
  );
}

function* watchproductsFetchFail() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.PRODUCTS_FETCH_FAIL,
    handleProductsFetchFail
  );
}

export default function* collectionSagas() {
  yield all([
    call(watchProductsFetchStart),
    call(watchproductsFetchFail),
    call(watchProductsFetchByCategory)
  ]);
}
