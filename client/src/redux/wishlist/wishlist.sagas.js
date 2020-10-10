import WISHLIST_ACTION_TYPES from "./wishlist.action.types";
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
  createNewWishlist,
  getUserWishlists,
  getWishlistById,
  deleteWishlistById
} from "../../firebase-utils/firebase.wishlist_utils";
import {
  saveCartItems,
  updateCart
} from "../../firebase-utils/firebase.cart_utils";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  removeWishlist
} from "./wishlist.utils";
import { truncate } from "../cart/cart.sagas";
import {
  wishlistsFetchFail,
  wishlistsFetchSuccess,
  fetchWishlistByIdFail,
  fetchWishlistByIdSuccess,
  updateWishlistFail,
  updateWishlistSuccess,
  deleteWishlistByIdFail,
  deleteWishlistByIdSuccess,
  createWishlistFail,
  createWishlistSuccess
} from "./wishlist.actions";
import {
  addErrorNotification,
  addSuccessNotification
} from "../notification/notification.actions";
import { selectCurrentUser } from "../user/user.selectors";
import { selectWishlists } from "./wishlist.selectors";

function* fetchWishlists() {
  try {
    const { id } = yield select(selectCurrentUser);
    const wishlists = yield getUserWishlists(id);
    yield put(wishlistsFetchSuccess(wishlists));
  } catch (err) {
    yield put(
      wishlistsFetchFail(
        "There was a problem getting your wishlists. Please try again"
      )
    );
  }
}

function* handleWishlistsFetchFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Getting Wishlists Failed", errorMsg));
}

function* fetchWishlistById({ payload: { wishlistId, onFail } }) {
  try {
    const wishlist = yield getWishlistById(wishlistId);
    if (!wishlist) {
      throw Error();
    }
    yield put(fetchWishlistByIdSuccess(wishlist));
  } catch (err) {
    yield put(
      fetchWishlistByIdFail(`There is no wishlist with id ${wishlistId}`)
    );
    yield onFail();
  }
}

function* handleWishlistFetchByIdFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Getting Wishlist Failed", errorMsg));
}

function* removeWishlistById({ payload: { wishlistId, wishlistName } }) {
  try {
    const wishlists = yield select(selectWishlists);
    yield deleteWishlistById(wishlistId);
    const updatedWishlists = yield removeWishlist(wishlists, wishlistId);
    yield put(
      deleteWishlistByIdSuccess(
        `${wishlistName} has been successfully deleted`,
        updatedWishlists
      )
    );
  } catch (err) {
    yield put(
      deleteWishlistByIdFail(
        `There was a problem deleting ${wishlistName}. It has either been already deleted or you do not have permission`
      )
    );
  }
}

function* handleRemoveWishlistFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Deleting Wishlist Failed", errorMsg));
}

function* handleRemoveWishlistSuccess({ payload: { notificationMsg } }) {
  yield put(addSuccessNotification("Wishlist Deleted", notificationMsg));
}

function* createWishlist({ payload: { newWishlistInfo, onSuccess } }) {
  const { wishlistName } = newWishlistInfo;
  try {
    const wishlists = yield select(selectWishlists);
    const { id } = yield select(selectCurrentUser);
    const newWishlist = yield createNewWishlist(id, newWishlistInfo);
    wishlists[newWishlist.wishlistId] = {
      ...newWishlist
    };
    delete wishlists[newWishlist.wishlistId].wishlistId;
    yield put(createWishlistSuccess(wishlistName, { ...wishlists }));
    yield onSuccess();
  } catch (err) {
    yield put(
      createWishlistFail(
        `A problem occurred while creating ${wishlistName} wishlist. Please ensure you are logged in`
      )
    );
  }
}

function* handleCreateWishlistFail({ payload: errorMsg }) {
  yield put(addErrorNotification("Creating Wishlist Failed", errorMsg));
}

function* handleCreateWishlistSuccess({ payload: { wishlistName } }) {
  yield put(
    addSuccessNotification(
      "Wishlist Created",
      `${wishlistName} wishlist was created`
    )
  );
}

function* handleAddingItemToWishlist({
  payload: { item, wishlist, wishlistId }
}) {
  try {
    const updatedWishlist = yield addItemToWishlist(wishlist, item);
    yield call(saveWishlistItems, updatedWishlist.items, wishlistId);
    yield put(
      updateWishlistSuccess(
        `Added To ${wishlist.wishlistName}`,
        `${truncate(item.name)} was added to ${wishlist.wishlistName}`,
        updatedWishlist
      )
    );
  } catch (err) {
    yield put(
      updateWishlistFail(
        `Adding To ${wishlist.wishlistName} Failed`,
        `There was a problem adding ${truncate(item.name)} to ${
          wishlist.wishlistName
        }`
      )
    );
  }
}

function* handleRemovingItemFromWishlist({
  payload: { item, wishlist, wishlistId }
}) {
  try {
    const updatedWishlist = yield removeItemFromWishlist(wishlist, item);
    yield call(saveWishlistItems, updatedWishlist.items, wishlistId);
    yield put(
      updateWishlistSuccess(
        `Removed From ${wishlist.wishlistName}`,
        `${truncate(item.name)} was removed from ${wishlist.wishlistName}`,
        updatedWishlist
      )
    );
  } catch (err) {
    yield put(
      updateWishlistFail(
        `Removing From ${wishlist.wishlistName} Failed`,
        `There was a problem removing ${truncate(item.name)} from ${
          wishlist.wishlistName
        }`
      )
    );
  }
}

function* saveWishlistItems(wishlistItems, wishlistId) {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    yield saveCartItems(wishlistItems, wishlistId);
  }
}

function* updateWishlist({
  payload: { updatedWishlistInfo, wishlistId, onSuccess }
}) {
  try {
    yield updateCart(wishlistId, updatedWishlistInfo);
    yield put(
      updateWishlistSuccess(
        "Wishlist Update Success",
        "Wishlist details have been updated!",
        updatedWishlistInfo,
        onSuccess
      )
    );
  } catch (err) {
    yield put(
      updateWishlistFail(
        "Wishlist Update Failed",
        "Wishlist details failed to update. Please try again"
      )
    );
  }
}

function* handleWishlistUpdateFail({ payload: { errorTitle, errorMsg } }) {
  yield put(addErrorNotification(errorTitle, errorMsg));
}

function* handleWishlistUpdateSuccess({
  payload: { notificationTitle, notificationMsg, onSuccess }
}) {
  yield put(addSuccessNotification(notificationTitle, notificationMsg));
  yield onSuccess();
}

function* watchWishlistsFetchStart() {
  yield takeLatest(WISHLIST_ACTION_TYPES.START_WISHLISTS_FETCH, fetchWishlists);
}

function* watchWishlistsFetchFail() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.WISHLISTS_FETCH_FAIL,
    handleWishlistsFetchFail
  );
}

function* watchWishlistFetchById() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_START,
    fetchWishlistById
  );
}

function* watchWishlistFetchByIdFail() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.FETCH_WISHLIST_BY_ID_FAIL,
    handleWishlistFetchByIdFail
  );
}

function* watchDeleteWishlistById() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.START_WISHLIST_DELETE_BY_ID,
    removeWishlistById
  );
}

function* watchDeleteWishlistByIdFail() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_FAIL,
    handleRemoveWishlistFail
  );
}

function* watchDeleteWishlistByIdSuccess() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.WISHLIST_DELETE_BY_ID_SUCCESS,
    handleRemoveWishlistSuccess
  );
}

function* watchCreateNewWishlist() {
  yield takeLatest(WISHLIST_ACTION_TYPES.CREATE_NEW_WISHLIST, createWishlist);
}

function* watchCreateWishlistFail() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.CREATE_WISHLIST_FAIL,
    handleCreateWishlistFail
  );
}

function* watchCreateWishlistSuccess() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.CREATE_WISHLIST_SUCCESS,
    handleCreateWishlistSuccess
  );
}

function* watchAddItemToWishlist() {
  // const channel = yield actionChannel([
  //   WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST
  // ]);
  // while (true) {
  //   const action = yield take(channel);
  //   console.log(action);
  //   yield call(handleAddingItemToWishlist, action);
  // }
  yield takeLatest(
    WISHLIST_ACTION_TYPES.START_ADD_TO_WISHLIST,
    handleAddingItemToWishlist
  );
}

function* watchRemoveItemFromWishlist() {
  yield takeEvery(
    WISHLIST_ACTION_TYPES.START_REMOVE_FROM_WISHLIST,
    handleRemovingItemFromWishlist
  );
}

function* watchWishlistUpdateStart() {
  yield takeLatest(WISHLIST_ACTION_TYPES.START_WISHLIST_UPDATE, updateWishlist);
}

function* watchWishlistUpdateFail() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_FAIL,
    handleWishlistUpdateFail
  );
}

function* watchWishlistUpdateSuccess() {
  yield takeLatest(
    WISHLIST_ACTION_TYPES.UPDATE_WISHLIST_SUCCESS,
    handleWishlistUpdateSuccess
  );
}

export default function* wishlistSagas() {
  yield all([
    call(watchWishlistsFetchStart),
    call(watchWishlistsFetchFail),
    call(watchWishlistFetchById),
    call(watchWishlistFetchByIdFail),
    call(watchDeleteWishlistById),
    call(watchDeleteWishlistByIdFail),
    call(watchDeleteWishlistByIdSuccess),
    call(watchCreateNewWishlist),
    call(watchCreateWishlistFail),
    call(watchCreateWishlistSuccess),
    call(watchAddItemToWishlist),
    call(watchRemoveItemFromWishlist),
    call(watchWishlistUpdateStart),
    call(watchWishlistUpdateFail),
    call(watchWishlistUpdateSuccess)
  ]);
}
