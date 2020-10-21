import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  initialCategoriesFetchFail,
  initialCategoriesFetchSuccess
} from "./product-category.actions";
import { getProductCategories } from "../../firebase-utils/firebase.product_utils";
import { addErrorNotification } from "../notification/notification.actions";

function* fetchCategories() {
  try {
    const productCategories = yield getProductCategories();
    yield put(initialCategoriesFetchSuccess(productCategories));
  } catch (err) {
    yield put(
      initialCategoriesFetchFail(
        "There was a problem with displaying the product categories"
      )
    );
  }
}

function* handleCategoriesFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Categories Fetching Failed", errorMsg));
}

function* watchCategoriesFetchStart() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START,
    fetchCategories
  );
}

function* watchCategoriesFetchFail() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
    handleCategoriesFetchFail
  );
}

export default function* productCategorySagas() {
  yield all([call(watchCategoriesFetchStart), call(watchCategoriesFetchFail)]);
}
