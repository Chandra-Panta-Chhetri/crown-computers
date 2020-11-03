import PRODUCT_CATEGORY_ACTION_TYPES from "./product-category.action.types";

export const startInitialCategoriesFetch = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.START_INITIAL_PRODUCT_CATEGORIES_FETCH
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
  payload: { errorTitle: "Categories Fetching Failed", errorMsg }
});

export const startLoadingMoreCategories = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.START_LOADING_MORE_PRODUCT_CATEGORIES
});

export const loadingMoreCategoriesFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOADING_MORE_PRODUCT_CATEGORIES_FAIL,
  payload: { errorTitle: "Fetching More Categories Failed", errorMsg }
});

export const loadingMoreCategoriesSuccess = (
  updatedProductCategories,
  lastVisibleDoc
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.LOADING_MORE_PRODUCT_CATEGORIES_SUCCESS,
  payload: { updatedProductCategories, lastVisibleDoc }
});

export const noMoreCategoriesToLoad = () => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.NO_MORE_PRODUCT_CATEGORIES_TO_LOAD
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
  payload: { errorTitle: "Product Category Delete Failed", errorMsg }
});

export const deleteCategoryByIdSuccess = (
  updatedProductCategories,
  successMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS,
  payload: {
    updatedProductCategories,
    successTitle: "Product Category Deleted",
    successMsg
  }
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
  payload: { errorTitle: "Category Creation Failed", errorMsg }
});

export const createNewCategorySuccess = (
  updatedProductCategories,
  successMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_SUCCESS,
  payload: {
    updatedProductCategories,
    successTitle: "Product Category Created",
    successMsg
  }
});

export const updateCategoryInfo = (
  updatedCategoryInfo,
  categoryId,
  onSuccess
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID,
  payload: {
    updatedCategoryInfo,
    categoryId,
    onSuccess,
    loadingText: "Updating product category"
  }
});

export const updateCategoryInfoFail = (errorMsg) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID_FAIL,
  payload: { errorTitle: "Product Category Update Failed", errorMsg }
});

export const updateCategoryInfoSuccess = (
  updatedProductCategories,
  successMsg
) => ({
  type: PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID_SUCCESS,
  payload: {
    updatedProductCategories,
    successTitle: "Product Category Updated",
    successMsg
  }
});
