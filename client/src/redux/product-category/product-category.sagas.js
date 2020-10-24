import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";
import { takeLatest, call, all, put, select } from "redux-saga/effects";
import {
  initialCategoriesFetchFail,
  initialCategoriesFetchSuccess,
  loadingMoreCategoriesFail,
  loadingMoreCategoriesSuccess,
  noMoreToLoad,
  deleteCategoryByIdFail,
  deleteCategoryByIdSuccess
} from "./product-category.actions";
import {
  getProductCategories,
  getMoreProductCategories,
  deleteProductCategoryById
} from "../../firebase-utils/firebase.product_utils";
import { addErrorNotification } from "../notification/notification.actions";
import {
  selectLastVisibleDoc,
  selectCategoriesPerPage,
  selectProductCategories
} from "./product-category.selectors";
import { removeCategory } from "./product-category.utils";

function* fetchCategories() {
  try {
    const categoriesPerPage = yield select(selectCategoriesPerPage);
    const { categories, lastVisibleDoc } = yield getProductCategories(
      categoriesPerPage
    );
    yield put(initialCategoriesFetchSuccess(categories, lastVisibleDoc));
  } catch (err) {
    yield put(
      initialCategoriesFetchFail(
        "There was a problem with displaying the product categories"
      )
    );
  }
}

function* fetchMoreCategories() {
  try {
    const categoriesPerPage = yield select(selectCategoriesPerPage);
    const lastDoc = yield select(selectLastVisibleDoc);
    const {
      categories: newCategories,
      lastVisibleDoc
    } = yield getMoreProductCategories(lastDoc, categoriesPerPage);
    if (!newCategories.length) {
      return yield put(noMoreToLoad());
    }
    yield put(loadingMoreCategoriesSuccess(newCategories, lastVisibleDoc));
  } catch (err) {
    yield put(
      loadingMoreCategoriesFail(
        "There was a problem loading more categories. Please try again later"
      )
    );
  }
}

function* handleCategoriesFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Categories Fetching Failed", errorMsg));
}

function* deleteCategoryById({ payload: { categoryId, categoryName } }) {
  try {
    const productCategories = yield select(selectProductCategories);
    yield deleteProductCategoryById(categoryId);
    const updatedCategories = yield removeCategory(
      categoryId,
      productCategories
    );
    yield put(deleteCategoryByIdSuccess(updatedCategories));
  } catch (err) {
    yield put(
      deleteCategoryByIdFail(
        `There was a problem deleting ${categoryName}. Please try again later`
      )
    );
  }
}

function* handleCategoryDeleteFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Product Category Delete Fail", errorMsg));
}

function* watchCategoriesFetchStart() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START,
    fetchCategories
  );
}

function* watchLoadMoreProductCategories() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_START,
    fetchMoreCategories
  );
}

function* watchCategoriesFetchFail() {
  yield takeLatest(
    [
      PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_FAIL
    ],
    handleCategoriesFetchFail
  );
}

function* watchCategoryDeleteById() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.START_CATEGORY_DELETE_BY_ID,
    deleteCategoryById
  );
}

function* watchCategoryDeleteByIdFail() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_FAIL,
    handleCategoryDeleteFail
  );
}

export default function* productCategorySagas() {
  yield all([
    call(watchCategoriesFetchStart),
    call(watchCategoriesFetchFail),
    call(watchLoadMoreProductCategories),
    call(watchCategoryDeleteById),
    call(watchCategoryDeleteByIdFail)
  ]);
}
