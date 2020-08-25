import USER_ACTION_TYPES from "../user/user.action.types";
import COLLECTION_ACTION_TYPES from "../collection/collection.action.types";
import DIRECTORY_ACTION_TYPES from "../directory/directory.action.types";
import { call, all, put, takeLatest, select } from "redux-saga/effects";
import {
  addSuccessNotification,
  addErrorNotification
} from "./notification.actions";
import { selectLatestId } from "./notification.selectors";

export function* createSuccessNotification(title, message) {
  const id = yield select(selectLatestId);
  yield put(addSuccessNotification(id, title, message));
}

export function* createErrorNotification(title, message) {
  const id = yield select(selectLatestId);
  yield put(addErrorNotification(id, title, message));
}

function* createNotificationByActionType(action) {
  const { payload } = action;

  switch (action.type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return yield call(
        createSuccessNotification,
        "Sign In Successful",
        `Welcome back ${payload.fullName.toUpperCase()}! Your cart has been restored`
      );
    case COLLECTION_ACTION_TYPES.COLLECTION_FETCH_FAIL:
      return yield call(
        createErrorNotification,
        "Collection Fetching Failed",
        payload
      );
    case DIRECTORY_ACTION_TYPES.CATEGORIES_FETCH_FAIL:
      return yield call(
        createErrorNotification,
        "Categories Fetching Failed",
        payload
      );
    case USER_ACTION_TYPES.SIGN_UP_FAIL:
      return yield call(createErrorNotification, "Sign Up Failed", payload);
    case USER_ACTION_TYPES.LOG_OUT_FAIL:
      return yield call(createErrorNotification, "Log Out Failed", payload);
    case USER_ACTION_TYPES.SIGN_IN_FAIL:
      return yield call(createErrorNotification, "Sign In Failed", payload);
  }
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
  yield all([call(watchLatestActionDispatch)]);
}
