import { createSelector } from "reselect";

export const selectWishList = (state) => state.wishList;

export const selectWishLists = createSelector(
  [selectWishList],
  (wishList) => wishList.wishLists
);

export const selectWishListData = createSelector(
  [selectWishList],
  (wishList) => wishList.wishListData
);

export const selectIsFetchingWishLists = createSelector(
  [selectWishList],
  (wishList) => wishList.isFetchingWishLists
);

export const selectIsUpdatingWishList = createSelector(
  [selectWishList],
  (wishList) => wishList.isUpdatingWishList
);

export const selectWishListLoadingText = createSelector(
  [selectWishList],
  (wishList) => wishList.loadingText
);
