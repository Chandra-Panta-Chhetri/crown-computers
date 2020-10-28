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
  createNewCategorySuccess,
  updateCategoryInfoFail,
  updateCategoryInfoSuccess
} from "./product-category.actions";
import {
  getProductCategories,
  getMoreProductCategories,
  deleteProductCategoryById,
  createNewProductCategory,
  updateProductCategoryById
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
import {
  removeCategory,
  updateCategory,
  addNewCategories
} from "./product-category.utils";
import { capitalize } from "../../global.utils";

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
    const prevProductCategories = yield select(selectProductCategories);
    const updatedProductCategories = yield addNewCategories(
      prevProductCategories,
      newCategories
    );
    yield put(
      loadingMoreCategoriesSuccess(updatedProductCategories, lastVisibleDoc)
    );
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

function* deleteCategoryById({ payload: { categoryToDelete } }) {
  const { categoryId, category: name, imageUrl } = categoryToDelete;
  try {
    const productCategories = yield select(selectProductCategories);
    yield deleteProductCategoryById(categoryId, imageUrl);
    const updatedProductCategories = yield removeCategory(
      categoryId,
      productCategories
    );
    yield put(
      deleteCategoryByIdSuccess(
        updatedProductCategories,
        `All the products in ${capitalize(name)} category and ${capitalize(
          name
        )} category itself has been deleted`
      )
    );
  } catch (err) {
    yield put(
      deleteCategoryByIdFail(
        `There was a problem deleting ${capitalize(
          name
        )}. Please try again later`
      )
    );
  }
}

function* handleCategoryDeleteFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Product Category Delete Fail", errorMsg));
}

function* handleCategoryDeleteSuccess({ payload: { notificationMsg } }) {
  yield put(addSuccessNotification("Product Category Delete", notificationMsg));
}

function* createNewCategory({ payload: { newCategoryInfo, onSuccess } }) {
  try {
    const productCategories = yield select(selectProductCategories);
    const createdCategory = yield createNewProductCategory(newCategoryInfo);
    const updatedProductCategories = [...productCategories, createdCategory];
    yield put(
      createNewCategorySuccess(
        updatedProductCategories,
        `${capitalize(createdCategory.category)} category has been created`
      )
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      createNewCategoryFail(
        `There was a problem creating ${capitalize(
          newCategoryInfo.category
        )}. Please ensure the uploaded image is of type png, jpg or jpeg.`
      )
    );
  }
}

function* handleCreateCategoryFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Category Creation Failed", errorMsg));
}

function* handleCreateCategorySuccess({ payload: { notificationMsg } }) {
  yield put(addSuccessNotification("Category Created", notificationMsg));
}

function* updateCategoryById({
  payload: { updatedCategoryInfo, categoryId, onSuccess }
}) {
  try {
    const productCategories = yield select(selectProductCategories);
    delete updatedCategoryInfo.categoryId;
    const updatedCategory = yield updateProductCategoryById(
      categoryId,
      updatedCategoryInfo
    );
    console.log(updatedCategory);
    const updatedProductCategories = yield updateCategory(
      categoryId,
      updatedCategory,
      productCategories
    );
    yield put(
      updateCategoryInfoSuccess(
        updatedProductCategories,
        "Product category info has been updated"
      )
    );
    yield onSuccess();
  } catch (err) {
    console.log(err);
    yield put(
      updateCategoryInfoFail(
        "There was a problem updating the product category info. Please try again later"
      )
    );
  }
}

function* handleCategoryUpdateFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Category Update Failed", errorMsg));
}

function* handleCategoryUpdateSuccess({ payload: { notificationMsg } }) {
  yield put(addSuccessNotification("Category Info Updated", notificationMsg));
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

function* watchCategoryDeleteByIdSuccess() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS,
    handleCategoryDeleteSuccess
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

function* watchUpdateCategoryInfo() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO,
    updateCategoryById
  );
}

function* watchUpdateCategoryInfoFail() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO_FAIL,
    handleCategoryUpdateFail
  );
}

function* watchUpdateCategoryInfoSuccess() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO_SUCCESS,
    handleCategoryUpdateSuccess
  );
}

export default function* productCategorySagas() {
  yield all([
    call(watchCategoriesFetchStart),
    call(watchCategoriesFetchFail),
    call(watchLoadMoreProductCategories),
    call(watchCategoryDeleteById),
    call(watchCategoryDeleteByIdFail),
    call(watchCategoryDeleteByIdSuccess),
    call(watchCreateNewCategory),
    call(watchCreateNewCategoryFail),
    call(watchCreateNewCategorySuccess),
    call(watchUpdateCategoryInfo),
    call(watchUpdateCategoryInfoFail),
    call(watchUpdateCategoryInfoSuccess)
  ]);
}
