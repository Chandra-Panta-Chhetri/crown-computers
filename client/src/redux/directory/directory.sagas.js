import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  categoriesFetchError,
  categoriesFetchSuccess
} from "./directory.actions";
import { getShopCategories } from "../../utils/firebase.utils";
import DIRECTORY_ACTION_TYPES from "./directory.action.types";

function* fetchCategories() {
  try {
    const productCategories = yield call(getShopCategories);
    yield put(categoriesFetchSuccess(productCategories));
  } catch (e) {
    yield put(
      categoriesFetchError(
        "There was a problem with displaying the product categories."
      )
    );
  }
}

function* watchCategoriesFetch() {
  yield takeLatest(
    DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_START,
    fetchCategories
  );
}

export default function* directorySagas() {
  yield all([call(watchCategoriesFetch)]);
}
