import DIRECTORY_ACTION_TYPES from "./directory.action.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  categoriesFetchFail,
  categoriesFetchSuccess
} from "./directory.actions";
import { getProductCategories } from "../../utils/firebase.product_utils";
import { addErrorNotification } from "../notification/notification.actions";

function* fetchCategories() {
  try {
    const productCategories = yield getProductCategories();
    yield put(categoriesFetchSuccess(productCategories));
  } catch (err) {
    yield put(
      categoriesFetchFail(
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
    DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_START,
    fetchCategories
  );
}

function* watchCategoriesFetchFail() {
  yield takeLatest(
    DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL,
    handleCategoriesFetchFail
  );
}

export default function* directorySagas() {
  yield all([call(watchCategoriesFetchStart), call(watchCategoriesFetchFail)]);
}
