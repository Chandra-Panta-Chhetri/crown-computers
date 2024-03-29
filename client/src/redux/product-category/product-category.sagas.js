import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";
import { takeLatest, call, all, put, select } from "redux-saga/effects";
import {
  initialCategoriesFetchFail,
  initialCategoriesFetchSuccess,
  loadingMoreCategoriesFail,
  loadingMoreCategoriesSuccess,
  noMoreCategoriesToLoad,
  fetchAllCategoriesFail,
  fetchAllCategoriesSuccess,
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
import { FIRESTORE_COLLECTION_REFS } from "../../firebase-utils/firebase.abstract_utils";
import {
  selectLastVisibleDoc,
  selectCategoriesPerPage,
  selectProductCategories
} from "./product-category.selectors";
import {
  capitalize,
  addUniqueItemsToCollection,
  removeObjFromArrOfObjects,
  updateObjInArrOfObjects
} from "../../global.utils";
import { getAllDocsInCollection } from "../../firebase-utils/firebase.abstract_utils";
import { analytics } from "../../firebase-utils/firebase.config";

function* fetchCategories() {
  try {
    const categoriesPerPage = yield select(selectCategoriesPerPage);
    const { categories, lastVisibleDoc } = yield getProductCategories(
      categoriesPerPage
    );
    yield put(initialCategoriesFetchSuccess(categories, lastVisibleDoc));
  } catch (err) {
    yield analytics.logEvent("category_load_fail", { err: err.message });
    yield put(
      initialCategoriesFetchFail(
        "There was a problem with displaying the product categories."
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
      return yield put(noMoreCategoriesToLoad());
    }
    const prevProductCategories = yield select(selectProductCategories);
    const updatedCategoriesWithoutDuplicates = yield addUniqueItemsToCollection(
      prevProductCategories,
      newCategories,
      "categoryId"
    );
    yield put(
      loadingMoreCategoriesSuccess(
        updatedCategoriesWithoutDuplicates,
        lastVisibleDoc
      )
    );
  } catch (err) {
    yield analytics.logEvent("category_load_more_fail", { err: err.message });
    yield put(
      loadingMoreCategoriesFail("There was a problem loading more categories.")
    );
  }
}

function* fetchAllCategories() {
  try {
    const productCategories = yield getAllDocsInCollection(
      FIRESTORE_COLLECTION_REFS.productCategoryCollectionRef,
      true,
      "categoryId"
    );
    yield put(fetchAllCategoriesSuccess(productCategories));
  } catch (err) {
    yield put(
      fetchAllCategoriesFail(
        "There was a problem loading all product categories."
      )
    );
  }
}

function* deleteCategoryById({ payload: { categoryToDelete } }) {
  const { categoryId, category: name, imageUrl } = yield categoryToDelete;
  try {
    yield deleteProductCategoryById(categoryId, imageUrl);
    const productCategories = yield select(selectProductCategories);
    const updatedProductCategories = yield removeObjFromArrOfObjects(
      "categoryId",
      categoryId,
      productCategories,
      `${capitalize(name)} has been deleted or does not exist.`
    );
    yield put(
      deleteCategoryByIdSuccess(
        updatedProductCategories,
        `The ${capitalize(
          name
        )} category has been deleted along with all the products within the category.`
      )
    );
  } catch (err) {
    let defaultErrMsg = yield `There was a problem deleting ${capitalize(
      name
    )}. Please try again later.`;
    yield analytics.logEvent("category_delete_fail", {
      err: err.message || defaultErrMsg,
      categoryToDelete
    });
    yield put(deleteCategoryByIdFail(err.message || defaultErrMsg));
  }
}

function* createNewCategory({ payload: { newCategoryInfo, onSuccess } }) {
  const { category } = yield newCategoryInfo;
  try {
    const newCategory = yield createNewProductCategory({
      ...newCategoryInfo
    });
    const productCategories = yield select(selectProductCategories);
    const updatedProductCategories = yield [...productCategories, newCategory];
    yield put(
      createNewCategorySuccess(
        updatedProductCategories,
        `${capitalize(category)} category has been created.`
      )
    );
    yield onSuccess();
  } catch (err) {
    yield analytics.logEvent("category_create_fail", {
      err: err.message,
      newCategoryInfo
    });
    yield put(
      createNewCategoryFail(
        `There was a problem creating ${capitalize(
          category
        )}. Ensure the uploaded image is a png/jpg/jpeg and is less than 100 kb.`
      )
    );
  }
}

function* updateCategoryById({
  payload: { updatedCategoryInfo, categoryId, onSuccess }
}) {
  try {
    yield delete updatedCategoryInfo.categoryId;
    const updatedCategory = yield updateProductCategoryById(categoryId, {
      ...updatedCategoryInfo
    });
    const productCategories = yield select(selectProductCategories);
    const updatedProductCategories = yield updateObjInArrOfObjects(
      "categoryId",
      categoryId,
      productCategories,
      "There was a problem updating the product category as it may have been deleted or does not exist.",
      updatedCategory
    );
    yield put(
      updateCategoryInfoSuccess(
        updatedProductCategories,
        "Product category info has been updated."
      )
    );
    yield onSuccess();
  } catch (err) {
    let defaultErrMsg = yield "There was a problem updating the product category. Please try again later.";
    yield analytics.logEvent("category_update_fail", {
      err: err.message || defaultErrMsg,
      updatedCategoryInfo,
      categoryId
    });
    yield put(updateCategoryInfoFail(err.message || defaultErrMsg));
  }
}

function* watchCategoriesFetchStart() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.START_INITIAL_PRODUCT_CATEGORIES_FETCH,
    fetchCategories
  );
}

function* watchLoadMoreProductCategories() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.START_LOADING_MORE_PRODUCT_CATEGORIES,
    fetchMoreCategories
  );
}

function* watchFetchAllCategories() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.FETCH_ALL_PRODUCT_CATEGORIES,
    fetchAllCategories
  );
}

function* watchCategoryDeleteById() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.DELETE_CATEGORY_BY_ID,
    deleteCategoryById
  );
}

function* watchCreateNewCategory() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY,
    createNewCategory
  );
}

function* watchUpdateCategoryInfo() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID,
    updateCategoryById
  );
}

export default function* productCategorySagas() {
  yield all([
    call(watchCategoriesFetchStart),
    call(watchLoadMoreProductCategories),
    call(watchFetchAllCategories),
    call(watchCategoryDeleteById),
    call(watchCreateNewCategory),
    call(watchUpdateCategoryInfo)
  ]);
}
