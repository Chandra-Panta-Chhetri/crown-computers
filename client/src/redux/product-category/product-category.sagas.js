import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";
import { takeLatest, call, all, put, select } from "redux-saga/effects";
import {
  initialCategoriesFetchFail,
  initialCategoriesFetchSuccess,
  loadingMoreCategoriesFail,
  loadingMoreCategoriesSuccess,
  noMoreCategoriesToLoad,
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
    yield put(
      loadingMoreCategoriesFail("There was a problem loading more categories.")
    );
  }
}

function* deleteCategoryById({ payload: { categoryToDelete } }) {
  const { categoryId, category: name, imageUrl } = yield categoryToDelete;
  try {
    const productCategories = yield select(selectProductCategories);
    yield deleteProductCategoryById(categoryId, imageUrl);
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
    yield put(deleteCategoryByIdFail(err.message));
  }
}

function* createNewCategory({ payload: { newCategoryInfo, onSuccess } }) {
  try {
    const productCategories = yield select(selectProductCategories);
    const createdCategory = yield createNewProductCategory(newCategoryInfo);
    const updatedProductCategories = yield [
      ...productCategories,
      createdCategory
    ];
    yield put(
      createNewCategorySuccess(
        updatedProductCategories,
        `${capitalize(createdCategory.category)} category has been created.`
      )
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      createNewCategoryFail(
        `There was a problem creating ${capitalize(
          newCategoryInfo.category
        )}. Ensure the uploaded image is a png/jpg/jpeg and is less than 100 kb.`
      )
    );
  }
}

function* updateCategoryById({
  payload: { updatedCategoryInfo, categoryId, onSuccess }
}) {
  try {
    const productCategories = yield select(selectProductCategories);
    yield delete updatedCategoryInfo.categoryId;
    yield updateProductCategoryById(categoryId, updatedCategoryInfo);
    const updatedCategory = { ...updatedCategoryInfo, categoryId };
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
    yield put(updateCategoryInfoFail(err.message));
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

function* watchCategoryDeleteById() {
  yield takeLatest(
    PRODUCT_CATEGORY_ACTION_TYPES.START_CATEGORY_DELETE_BY_ID,
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
    call(watchCategoryDeleteById),
    call(watchCreateNewCategory),
    call(watchUpdateCategoryInfo)
  ]);
}
