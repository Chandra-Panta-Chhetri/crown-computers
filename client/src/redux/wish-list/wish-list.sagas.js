import WISH_LIST_ACTION_TYPES from "./wish-list.action.types";
import {
  all,
  put,
  select,
  takeLatest,
  call,
  actionChannel,
  take,
  takeEvery
} from "redux-saga/effects";
import {
  createNewWishList,
  getWishLists,
  getWishListById,
  deleteWishListById
} from "../../firebase-utils/firebase.wish-list_utils";
import {
  saveCartItems,
  updateCart
} from "../../firebase-utils/firebase.cart_utils";
import {
  addItemToWishList,
  removeItemFromWishList,
  removeWishList
} from "./wish-list.utils";
import { capitalize, truncate } from "../../global.utils.js";
import {
  wishListsFetchFail,
  wishListsFetchSuccess,
  fetchWishListByIdFail,
  fetchWishListByIdSuccess,
  updateWishListFail,
  updateWishListSuccess,
  deleteWishListByIdFail,
  deleteWishListByIdSuccess,
  createWishListFail,
  createWishListSuccess
} from "./wish-list.actions";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { selectCurrentUser } from "../user/user.selectors";
import { selectWishLists } from "./wish-list.selectors";

function* fetchWishLists() {
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const wishLists = yield getWishLists(userId);
    yield put(wishListsFetchSuccess(wishLists));
  } catch (err) {
    yield put(
      wishListsFetchFail(
        "There was a problem getting your wish lists. Please try again"
      )
    );
  }
}

function* handleWishListsFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Getting Wish Lists Failed", errorMsg));
}

function* fetchWishListById({ payload: { wishListId, onFail } }) {
  try {
    const wishList = yield getWishListById(wishListId);
    if (!wishList) {
      throw Error();
    }
    yield put(fetchWishListByIdSuccess(wishList));
  } catch (err) {
    yield put(
      fetchWishListByIdFail(`There is no wish list with id ${wishListId}`)
    );
    yield onFail();
  }
}

function* handleWishListFetchByIdFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Getting Wish List Failed", errorMsg));
}

function* removeWishListById({ payload: { wishListToDelete } }) {
  const wishListName = capitalize(wishListToDelete.wishListName);
  try {
    const wishLists = yield select(selectWishLists);
    yield deleteWishListById(wishListToDelete);
    const updatedWishLists = yield removeWishList(
      wishLists,
      wishListToDelete.wishListId
    );
    yield put(
      deleteWishListByIdSuccess(
        `${wishListName} has been deleted`,
        updatedWishLists
      )
    );
  } catch (err) {
    yield put(
      deleteWishListByIdFail(
        `There was a problem deleting ${wishListName}. It has either been already deleted or you do not have permission`
      )
    );
  }
}

function* handleRemoveWishListFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Deleting Wish List Failed", errorMsg));
}

function* handleRemoveWishListSuccess({ payload: { notificationMsg } }) {
  yield put(addSuccessNotification("Wish List Deleted", notificationMsg));
}

function* createWishList({ payload: { newWishListInfo, onSuccess } }) {
  const wishListName = capitalize(newWishListInfo.wishListName);
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const newWishList = yield createNewWishList(userId, newWishListInfo);
    yield put(createWishListSuccess(newWishList));
    yield onSuccess();
  } catch (err) {
    yield put(
      createWishListFail(
        `A problem occurred while creating ${wishListName}. Please ensure you are logged in`
      )
    );
  }
}

function* handleCreateWishListFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Creating Wish List Failed", errorMsg));
}

function* handleCreateWishListSuccess({ payload: createdWishList }) {
  yield put(
    addSuccessNotification(
      "Wish List Created",
      `${createdWishList.wishListName} was created`
    )
  );
}

function* handleAddingItemToWishList({
  payload: { item, wishList, onSuccess }
}) {
  const { wishListName, wishListId } = wishList;
  const capitalizedName = capitalize(wishListName);
  try {
    console.log(item, wishList);
    const updatedWishList = yield addItemToWishList(wishList, item);
    yield call(saveWishListItems, updatedWishList.items, wishListId);
    yield put(
      updateWishListSuccess(
        `Added Item To ${capitalizedName}`,
        `${truncate(item.name)} was added to ${capitalizedName}`,
        updatedWishList
      )
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      updateWishListFail(`Adding To ${capitalizedName} Failed`, err.message)
    );
  }
}

function* handleRemovingItemFromWishList({ payload: { item, wishList } }) {
  const { wishListName, wishListId } = wishList;
  const capitalizedName = capitalize(wishListName);
  try {
    const updatedWishList = yield removeItemFromWishList(wishList, item);
    yield call(saveWishListItems, updatedWishList.items, wishListId);
    yield put(
      updateWishListSuccess(
        `Removed From ${capitalizedName}`,
        `${truncate(item.name)} was removed from ${capitalizedName}`,
        updatedWishList
      )
    );
  } catch (err) {
    yield put(
      updateWishListFail(`Removing From ${capitalizedName} Failed`, err.message)
    );
  }
}

function* saveWishListItems(wishListItems, wishListId) {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser) {
    throw Error("Please ensure you are logged in");
  }
  yield saveCartItems(wishListItems, wishListId);
}

function* updateWishList({
  payload: { updatedWishList, wishListId, onSuccess }
}) {
  try {
    yield updateCart(wishListId, updatedWishList);
    yield put(
      updateWishListSuccess(
        "Wish List Update Success",
        "Wish list details have been updated!",
        updatedWishList,
        onSuccess
      )
    );
  } catch (err) {
    yield put(
      updateWishListFail(
        "Wish List Update Failed",
        "Wish list details failed to update. Please try again"
      )
    );
  }
}

function* handleWishListUpdateFail({ payload: { errorTitle, errorMsg } }) {
  yield put(addErrorNotification(errorTitle, errorMsg));
}

function* handleWishListUpdateSuccess({
  payload: { notificationTitle, notificationMsg, onSuccess }
}) {
  yield put(addSuccessNotification(notificationTitle, notificationMsg));
  yield onSuccess();
}

function* watchWishListsFetchStart() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_WISH_LISTS_FETCH,
    fetchWishLists
  );
}

function* watchWishListsFetchFail() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.WISH_LISTS_FETCH_FAIL,
    handleWishListsFetchFail
  );
}

function* watchWishListFetchById() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_START,
    fetchWishListById
  );
}

function* watchWishListFetchByIdFail() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.FETCH_WISH_LIST_BY_ID_FAIL,
    handleWishListFetchByIdFail
  );
}

function* watchDeleteWishListById() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_WISH_LIST_DELETE_BY_ID,
    removeWishListById
  );
}

function* watchDeleteWishListByIdFail() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_FAIL,
    handleRemoveWishListFail
  );
}

function* watchDeleteWishListByIdSuccess() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.WISH_LIST_DELETE_BY_ID_SUCCESS,
    handleRemoveWishListSuccess
  );
}

function* watchCreateNewWishList() {
  yield takeLatest(WISH_LIST_ACTION_TYPES.CREATE_NEW_WISH_LIST, createWishList);
}

function* watchCreateWishListFail() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_FAIL,
    handleCreateWishListFail
  );
}

function* watchCreateWishListSuccess() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.CREATE_WISH_LIST_SUCCESS,
    handleCreateWishListSuccess
  );
}

function* watchAddItemToWishList() {
  const channel = yield actionChannel([
    WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST
  ]);
  while (true) {
    const action = yield take(channel);
    yield call(handleAddingItemToWishList, action);
  }
  // yield takeLatest(
  //   WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST,
  //   handleAddingItemToWishList
  // );
}

function* watchRemoveItemFromWishList() {
  yield takeEvery(
    WISH_LIST_ACTION_TYPES.START_REMOVE_FROM_WISH_LIST,
    handleRemovingItemFromWishList
  );
}

function* watchWishListUpdateStart() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_WISH_LIST_UPDATE,
    updateWishList
  );
}

function* watchWishListUpdateFail() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_FAIL,
    handleWishListUpdateFail
  );
}

function* watchWishListUpdateSuccess() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.UPDATE_WISH_LIST_SUCCESS,
    handleWishListUpdateSuccess
  );
}

export default function* wishListSagas() {
  yield all([
    call(watchWishListsFetchStart),
    call(watchWishListsFetchFail),
    call(watchWishListFetchById),
    call(watchWishListFetchByIdFail),
    call(watchDeleteWishListById),
    call(watchDeleteWishListByIdFail),
    call(watchDeleteWishListByIdSuccess),
    call(watchCreateNewWishList),
    call(watchCreateWishListFail),
    call(watchCreateWishListSuccess),
    call(watchAddItemToWishList),
    call(watchRemoveItemFromWishList),
    call(watchWishListUpdateStart),
    call(watchWishListUpdateFail),
    call(watchWishListUpdateSuccess)
  ]);
}
