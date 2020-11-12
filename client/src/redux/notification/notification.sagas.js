import CART_ACTION_TYPES from "../cart/cart.action.types";
import CHECKOUT_ACTION_TYPES from "../checkout/checkout.action.types";
import USER_ACTION_TYPES from "../user/user.action.types";
import SALE_ACTION_TYPES from "../sale/sale.action.types";
import PRODUCT_CATEGORY_ACTION_TYPES from "../product-category/product-category.action.types";
import WISH_LIST_ACTION_TYPES from "../wish-list/wish-list.action.types";
import PRODUCT_ACTION_TYPES from "../product/product.action.types";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  addErrorNotification,
  addSuccessNotification
} from "./notification.actions";

function* showErrorNotification({ payload: { errorTitle, errorMsg } }) {
  yield put(addErrorNotification(errorTitle, errorMsg));
}

function* showSuccessNotification({ payload: { successTitle, successMsg } }) {
  yield put(addSuccessNotification(successTitle, successMsg));
}

function* watchErrorNotifications() {
  yield takeEvery(
    [
      CART_ACTION_TYPES.UPDATE_CART_FAIL,
      CHECKOUT_ACTION_TYPES.CHECKOUT_FAIL,
      USER_ACTION_TYPES.SIGN_UP_FAIL,
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      USER_ACTION_TYPES.SIGN_IN_FAIL,
      SALE_ACTION_TYPES.INITIAL_SALES_FETCH_FAIL,
      SALE_ACTION_TYPES.LOADING_MORE_SALES_FAIL,
      SALE_ACTION_TYPES.SALES_SUMMARY_FETCH_FAIL,
      PRODUCT_ACTION_TYPES.INITIAL_PRODUCTS_FETCH_FAIL,
      PRODUCT_ACTION_TYPES.LOADING_MORE_PRODUCTS_FAIL,
      PRODUCT_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.INITIAL_PRODUCT_CATEGORIES_FETCH_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.LOADING_MORE_PRODUCT_CATEGORIES_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_FAIL,
      PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID_FAIL,
      WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_FAIL,
      WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_FAIL,
      WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_FAIL,
      WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_FAIL,
      WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_FAIL,
      PRODUCT_ACTION_TYPES.PRODUCT_DELETE_BY_ID_FAIL,
      PRODUCT_ACTION_TYPES.CREATE_NEW_PRODUCT_FAIL
    ],
    showErrorNotification
  );
}

function* watchSuccessNotifications() {
  yield takeEvery(
    [
      PRODUCT_CATEGORY_ACTION_TYPES.CATEGORY_DELETE_BY_ID_SUCCESS,
      PRODUCT_CATEGORY_ACTION_TYPES.CREATE_NEW_CATEGORY_SUCCESS,
      PRODUCT_CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_BY_ID_SUCCESS,
      WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_SUCCESS,
      WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_SUCCESS,
      WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_SUCCESS,
      PRODUCT_ACTION_TYPES.PRODUCT_DELETE_BY_ID_SUCCESS,
      PRODUCT_ACTION_TYPES.CREATE_NEW_PRODUCT_SUCCESS
    ],
    showSuccessNotification
  );
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotifications), call(watchSuccessNotifications)]);
}
