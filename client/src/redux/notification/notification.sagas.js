import CART_ACTION_TYPES from "../cart/cart.action.types";
import USER_ACTION_TYPES from "../user/user.action.types";
import COLLECTION_ACTION_TYPES from "../collection/collection.action.types";
import DIRECTORY_ACTION_TYPES from "../directory/directory.action.types";
import { takeEvery, call, all, put, takeLatest } from "redux-saga/effects";
import {
  addSuccessNotification,
  addErrorNotification
} from "./notification.actions";

function* createSuccessNotification(id, title, message) {
  yield put(addSuccessNotification(id, title, message));
}

function* createErrorNotification(id, title, message) {
  yield put(addErrorNotification(id, title, message));
}

function* createNotificationByActionType(action) {
  const { payload } = action;
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_TO_CART:
      return yield createSuccessNotification(
        payload.id,
        "Added To Cart",
        `${payload.name} ($${payload.price} ea.)`
      );
    case CART_ACTION_TYPES.REMOVE_FROM_CART:
      return yield createSuccessNotification(
        payload.id,
        "Removed From Cart",
        payload.name
      );
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return yield createSuccessNotification(
        action.type,
        "Sign In Successful",
        `Welcome back ${payload.fullName.toUpperCase()}!`
      );
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAIL:
      return yield createErrorNotification(
        action.type,
        "Collection Fetching Failed",
        payload
      );
    case DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL:
      return yield createErrorNotification(
        action.type,
        "Categories Fetching Failed",
        payload
      );
    case USER_ACTION_TYPES.SIGN_UP_FAIL:
      return yield createErrorNotification(
        action.type,
        "Sign Up Failed",
        payload
      );
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
      return yield createErrorNotification(
        action.type,
        "Log Out Failed",
        payload
      );
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
      return yield createErrorNotification(
        action.type,
        "Sign In Failed",
        payload
      );
    default:
      break;
  }
}

function* watchEveryActionDispatch() {
  yield takeEvery(
    [CART_ACTION_TYPES.ADD_TO_CART, CART_ACTION_TYPES.REMOVE_FROM_CART],
    createNotificationByActionType
  );
}

function* watchLatestActionDispatch() {
  yield takeLatest(
    [
      USER_ACTION_TYPES.SIGN_IN_FAIL,
      USER_ACTION_TYPES.SIGN_IN_SUCCESS,
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      USER_ACTION_TYPES.SIGN_UP_FAIL,
      COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAIL,
      DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL
    ],
    createNotificationByActionType
  );
}

export default function* notificationSagas() {
  yield all([call(watchEveryActionDispatch), call(watchLatestActionDispatch)]);
}
