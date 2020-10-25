import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";
import { takeLatest, call, all, put, select } from "redux-saga/effects";
import {
  initialCategoriesFetchFail,
  initialCategoriesFetchSuccess,
  loadingMoreCategoriesFail,
  loadingMoreCategoriesSuccess,
  noMoreToLoad,
  deleteCategoryByIdFail,
  deleteCategoryByIdSuccess,
  createNewCategoryFail,
  createNewCategorySuccess
} from "./product-category.actions";
import {
  getProductCategories,
  getMoreProductCategories,
  deleteProductCategoryById,
  createNewProductCategory
} from "../../firebase-utils/firebase.product_utils";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
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

function* createNewCategory({ payload: { newCategoryInfo, onSuccess } }) {
  try {
    const createdCategory = yield createNewProductCategory(newCategoryInfo);
    yield put(createNewCategorySuccess(createdCategory));
    yield onSuccess();
  } catch (err) {
    yield put(
      createNewCategoryFail(
        `There was a problem creating ${newCategoryInfo.category}. Please try again later`
      )
    );
  }
}

function* handleCreateCategoryFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Category Creation Failed", errorMsg));
}

function* handleCreateCategorySuccess({ payload: createdCategory }) {
  yield put(
    addSuccessNotification(
      "Category Created",
      `New ${createdCategory.category} created`
    )
  );
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

function* watchCreateNewCategory() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY,
    createNewCategory
  );
}

function* watchCreateNewCategoryFail() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_FAIL,
    handleCreateCategoryFail
  );
}

function* watchCreateNewCategorySuccess() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_SUCCESS,
    handleCreateCategorySuccess
  );
}

export default function* productCategorySagas() {
  yield all([
    call(watchCategoriesFetchStart),
    call(watchCategoriesFetchFail),
    call(watchLoadMoreProductCategories),
    call(watchCategoryDeleteById),
    call(watchCategoryDeleteByIdFail),
    call(watchCreateNewCategory),
    call(watchCreateNewCategoryFail),
    call(watchCreateNewCategorySuccess)
  ]);
}
