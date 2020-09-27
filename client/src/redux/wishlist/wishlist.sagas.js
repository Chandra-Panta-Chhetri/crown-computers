import WISHLIST_ACTION_TYPES from "./wishlist.action.types";
import { all, takeLatest } from "redux-saga/effects";

function* fetchWishlists() {
  try {
  } catch (err) {}
}

function* watchWishlistsFetchStart() {
  yield takeLatest(WISHLIST_ACTION_TYPES.START_WISHLISTS_FETCH, fetchWishlists);
}

export default function* wishlistSagas() {
  yield all([call(watchWishlistsFetchStart)]);
}
