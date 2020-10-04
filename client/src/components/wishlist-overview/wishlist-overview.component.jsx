import React, { useState, useEffect } from "react";
import {
  WishlistsContainer,
  WishlistOverviewContainer,
  NewWishlistBtn,
  NoWishlistsText,
  CreateWishlistModal,
  CreateWishlistBtn,
  TotalWishlistsText
} from "./wishlist-overview.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";
import FormInput from "../form-input/form-input.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import {
  createNewWishlist,
  startWishlistsFetch
} from "../../redux/wishlist/wishlist.actions";
import {
  selectIsFetchingWishlists,
  selectIsUpdatingWishlist,
  selectWishlists
} from "../../redux/wishlist/wishlist.selectors";

const WishListOverview = ({
  wishlists,
  startCreatingWishlist,
  isCreatingWishlist,
  isFetchingWishlists,
  fetchWishlists
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const numOfWishlists = Object.keys(wishlists).length || 0;
  const wishlistIds = Object.keys(wishlists) || [];

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setNewWishlistName("");
  };

  const createWishlist = (e) => {
    e.preventDefault();
    startCreatingWishlist({ wishlistName: newWishlistName }, closeModal);
  };

  const handleChange = (e) => setNewWishlistName(e.target.value);

  return (
    <WishlistOverviewContainer>
      <NewWishlistBtn
        isIconButton
        iconClass="fas fa-plus"
        onClick={() => setIsAddModalOpen(true)}
      >
        New Wishlist
      </NewWishlistBtn>
      {numOfWishlists > 0 && (
        <TotalWishlistsText>
          Total Wishlists: {numOfWishlists}
        </TotalWishlistsText>
      )}
      <CreateWishlistModal
        isOpen={isAddModalOpen}
        closeModalHandler={closeModal}
        modalTitle="Create New Wishlist"
      >
        <form onSubmit={createWishlist}>
          <FormInput
            label="Wishlist Name"
            inputValue={newWishlistName}
            inputChangeHandler={handleChange}
            required
          />
          <CreateWishlistBtn type="submit" disabled={isCreatingWishlist}>
            {isCreatingWishlist ? (
              <LoadingText>Creating Wishlist</LoadingText>
            ) : (
              "Create Wishlist"
            )}
          </CreateWishlistBtn>
        </form>
      </CreateWishlistModal>
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
  isCreatingWishlist: selectIsUpdatingWishlist(state),
  wishlists: selectWishlists(state),
  isFetchingWishlists: selectIsFetchingWishlists(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCreatingWishlist: (newWishlistInfo, onSuccess) =>
    dispatch(createNewWishlist(newWishlistInfo, onSuccess)),
  fetchWishlists: () => dispatch(startWishlistsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListOverview);
