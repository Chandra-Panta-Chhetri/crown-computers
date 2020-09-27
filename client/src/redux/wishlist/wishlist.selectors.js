import { createSelector } from "reselect";

export const selectWishlist = (state) => state.wishlist;

export const selectWishlists = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.wishlists
);

export const selectWishlistData = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.wishlistData
);

export const selectIsFetchingWishlists = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.isFetchingWishlists
);

export const selectIsUpdatingWishlist = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.isUpdatingWishlist
);

export const selectLoadingText = createSelector(
  [selectWishlist],
  (wishlist) => wishlist.loadingText
);
