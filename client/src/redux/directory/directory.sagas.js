import DIRECTORY_ACTION_TYPES from "./directory.action.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  categoriesFetchFail,
  categoriesFetchSuccess
} from "./directory.actions";
import { getProductCategories } from "../../utils/firebase.collection_utils";

function* fetchCategories() {
  try {
    const productCategories = yield getProductCategories();
    yield put(categoriesFetchSuccess(productCategories));
  } catch (e) {
    yield put(
      categoriesFetchFail(
        "There was a problem with displaying the product categories"
      )
    );
  }
}

function* watchCategoriesFetchStart() {
  yield takeLatest(
    DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_START,
    fetchCategories
  );
}

export default function* directorySagas() {
  yield all([call(watchCategoriesFetchStart)]);
}
