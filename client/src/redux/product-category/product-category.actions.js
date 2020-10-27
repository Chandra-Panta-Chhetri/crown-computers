import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

export const startInitialCategoriesFetch = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_START
});

export const initialCategoriesFetchSuccess = (
  productCategories,
  lastVisibleDoc
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_SUCCESS,
  payload: { productCategories, lastVisibleDoc }
});

export const initialCategoriesFetchFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
  payload: errorMsg
});

export const startLoadingMoreCategories = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_START
});

export const loadingMoreCategoriesFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_FAIL,
  payload: errorMsg
});

export const loadingMoreCategoriesSuccess = (
  newProductCategories,
  lastVisibleDoc
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOAD_MORE_PRODUCT_CATEGORIES_SUCCESS,
  payload: { newProductCategories, lastVisibleDoc }
});

export const noMoreToLoad = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.NO_MORE_TO_LOAD
});

export const startDeleteCategoryById = (categoryToDelete) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.START_CATEGORY_DELETE_BY_ID,
  payload: {
    categoryToDelete,
    loadingText: `Deleting ${categoryToDelete.category}`
  }
});

export const deleteCategoryByIdFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_FAIL,
  payload: errorMsg
});

export const deleteCategoryByIdSuccess = (
  updatedProductCategories,
  notificationMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS,
  payload: { updatedProductCategories, notificationMsg }
});

export const createNewCategory = (newCategoryInfo, onSuccess) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY,
  payload: {
    newCategoryInfo,
    onSuccess,
    loadingText: `Creating ${newCategoryInfo.category} category`
  }
});

export const createNewCategoryFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_FAIL,
  payload: errorMsg
});

export const createNewCategorySuccess = (
  updatedProductCategories,
  notificationMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_SUCCESS,
  payload: { updatedProductCategories, notificationMsg }
});

export const updateCategoryInfo = (
  updatedCategoryInfo,
  categoryId,
  onSuccess
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO,
  payload: {
    updatedCategoryInfo,
    categoryId,
    onSuccess,
    loadingText: "Updating product category"
  }
});

export const updateCategoryInfoFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO_FAIL,
  payload: errorMsg
});

export const updateCategoryInfoSuccess = (
  updatedProductCategories,
  notificationMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_INFO_SUCCESS,
  payload: { updatedProductCategories, notificationMsg }
});
