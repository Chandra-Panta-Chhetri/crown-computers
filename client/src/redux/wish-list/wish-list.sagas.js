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
import { selectCurrentUser } from "../user/user.selectors";
import { selectWishLists } from "./wish-list.selectors";

function* fetchWishLists() {
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const wishLists = yield getWishLists(userId);
    yield put(wishListsFetchSuccess(wishLists));
  } catch (err) {
    yield put(
      wishListsFetchFail("There was a problem getting your wish lists.")
    );
  }
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
      fetchWishListByIdFail(
        "The requested wish list has been removed or does not exist."
      )
    );
    yield onFail();
  }
}

function* removeWishListById({ payload: { wishListToDelete } }) {
  const wishListName = yield capitalize(wishListToDelete.wishListName);
  try {
    const wishLists = yield select(selectWishLists);
    yield deleteWishListById(wishListToDelete);
    const updatedWishLists = yield removeWishList(
      wishLists,
      wishListToDelete.wishListId
    );
    yield put(
      deleteWishListByIdSuccess(
        `${wishListName} has been deleted.`,
        updatedWishLists
      )
    );
  } catch (err) {
    yield put(
      deleteWishListByIdFail(
        `There was a problem deleting ${wishListName}. It has been deleted or you do not have permission to do so.`
      )
    );
  }
}

function* createWishList({ payload: { newWishListInfo, onSuccess } }) {
  const wishListName = yield capitalize(newWishListInfo.wishListName);
  try {
    const { id: userId } = yield select(selectCurrentUser);
    const newWishList = yield createNewWishList(userId, newWishListInfo);
    yield put(
      createWishListSuccess(newWishList, `${wishListName} was created`)
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      createWishListFail(
        `A problem occurred while creating ${wishListName}. Please ensure you are logged in.`
      )
    );
  }
}

function* handleAddingItemToWishList({
  payload: { item, wishList, onSuccess }
}) {
  const { wishListName, wishListId } = yield wishList;
  const capitalizedName = yield capitalize(wishListName);
  try {
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
        `${truncate(item.name)} was removed from ${capitalizedName}.`,
        updatedWishList
      )
    );
  } catch (err) {
    yield put(
      updateWishListFail(`Removing From Wish List Failed`, err.message)
    );
  }
}

function* saveWishListItems(wishListItems, wishListId) {
  const currentUser = yield select(selectCurrentUser);
  if (!currentUser) {
    throw Error("Please ensure you are logged in.");
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
        "Wish List Updated",
        "Wish list details have been updated!",
        updatedWishList
      )
    );
    yield onSuccess();
  } catch (err) {
    yield put(
      updateWishListFail(
        "Wish List Update Failed",
        "Wish list details failed to update. Please try again later."
      )
    );
  }
}

function* watchWishListsFetchStart() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_WISH_LISTS_FETCH,
    fetchWishLists
  );
}

function* watchWishListFetchById() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_FETCH_WISH_LIST_BY_ID,
    fetchWishListById
  );
}

function* watchDeleteWishListById() {
  yield takeLatest(
    WISH_LIST_ACTION_TYPES.START_WISH_LIST_DELETE_BY_ID,
    removeWishListById
  );
}

function* watchCreateNewWishList() {
  yield takeLatest(WISH_LIST_ACTION_TYPES.CREATE_NEW_WISH_LIST, createWishList);
}

function* watchAddItemToWishList() {
  const channel = yield actionChannel([
    WISH_LIST_ACTION_TYPES.START_ADD_TO_WISH_LIST
  ]);
  while (true) {
    const action = yield take(channel);
    yield call(handleAddingItemToWishList, action);
  }
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

export default function* wishListSagas() {
  yield all([
    call(watchWishListsFetchStart),
    call(watchWishListFetchById),
    call(watchDeleteWishListById),
    call(watchCreateNewWishList),
    call(watchAddItemToWishList),
    call(watchRemoveItemFromWishList),
    call(watchWishListUpdateStart)
  ]);
}
