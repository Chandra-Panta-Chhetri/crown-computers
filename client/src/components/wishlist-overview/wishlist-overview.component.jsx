import React, { useEffect } from "react";
import {
  WishlistsContainer,
  WishlistOverviewContainer,
  NoWishlistsText,
  TotalWishlistsText,
  StyledCreateWishlistBtn
} from "./wishlist-overview.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import { startWishlistsFetch } from "../../redux/wishlist/wishlist.actions";
import {
  selectIsFetchingWishlists,
  selectWishlists
} from "../../redux/wishlist/wishlist.selectors";

const WishListOverview = ({
  wishlists,
  isFetchingWishlists,
  fetchWishlists
}) => {
  const numOfWishlists = Object.keys(wishlists).length || 0;
  const wishlistIds = Object.keys(wishlists) || [];

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  return (
    <WishlistOverviewContainer>
      <StyledCreateWishlistBtn />
      {numOfWishlists > 0 && (
        <TotalWishlistsText>
          Total Wishlists: {numOfWishlists}
        </TotalWishlistsText>
      )}
      <WishlistsContainer numberOfWishlists={numOfWishlists}>
        {!isFetchingWishlists ? (
          wishlistIds.map((wishlistId) => (
            <WishlistPreview
              key={wishlistId}
              wishlistId={wishlistId}
              {...wishlists[wishlistId]}
            />
          ))
        ) : (
          <Spinner loadingText="Getting latest wishlists" />
        )}
        {!numOfWishlists && !isFetchingWishlists && (
          <NoWishlistsText>
            It seems you have no wishlists. Create one using the button above!
          </NoWishlistsText>
        )}
      </WishlistsContainer>
    </WishlistOverviewContainer>
  );
};

const mapStateToProps = (state) => ({
  wishlists: selectWishlists(state),
  isFetchingWishlists: selectIsFetchingWishlists(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishlists: () => dispatch(startWishlistsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListOverview);
