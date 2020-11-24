import React, { useEffect } from "react";
import {
  WishListsContainer,
  WishListOverviewContainer,
  NoWishListsText,
  TotalWishListsText,
  StyledCreateWishListBtn
} from "./wish-list-overview.styles";

import WishListPreview from "../wish-list-preview/wish-list-preview.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import { startWishListsFetch } from "../../redux/wish-list/wish-list.actions";
import {
  selectIsFetchingWishLists,
  selectWishLists
} from "../../redux/wish-list/wish-list.selectors";
import { createStructuredSelector } from "reselect";

const WishListOverview = ({
  wishLists,
  isFetchingWishLists,
  fetchWishLists
}) => {
  const numOfWishLists = wishLists.length || 0;

  useEffect(() => {
    fetchWishLists();
  }, [fetchWishLists]);

  return (
    <WishListOverviewContainer>
      <StyledCreateWishListBtn />
      {numOfWishLists > 0 && (
        <TotalWishListsText>
          Total Wish Lists: {numOfWishLists}
        </TotalWishListsText>
      )}
      <WishListsContainer numberOfWishLists={numOfWishLists}>
        {!isFetchingWishLists ? (
          (wishLists || []).map((wishList) => (
            <WishListPreview key={wishList.wishListId} wishList={wishList} />
          ))
        ) : (
          <Spinner loadingText="Getting latest wish lists" />
        )}
        {!numOfWishLists && !isFetchingWishLists && (
          <NoWishListsText>
            It seems you have no wish lists. Create one using the button above!
          </NoWishListsText>
        )}
      </WishListsContainer>
    </WishListOverviewContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  wishLists: selectWishLists,
  isFetchingWishLists: selectIsFetchingWishLists
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishLists: () => dispatch(startWishListsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListOverview);
