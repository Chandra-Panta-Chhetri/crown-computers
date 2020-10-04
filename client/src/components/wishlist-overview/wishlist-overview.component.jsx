import React, { useState } from "react";
import {
  WishlistsContainer,
  WishlistOverviewContainer,
  NewWishlistBtn,
  NoWishlistsText,
  CreateWishlistModal,
  CreateWishlistBtn
} from "./wishlist-overview.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";
import FormInput from "../form-input/form-input.component";
import { connect } from "react-redux";
import { createNewWishlist } from "../../redux/wishlist/wishlist.actions";
import {
  selectIsUpdatingWishlist,
  selectWishlists
} from "../../redux/wishlist/wishlist.selectors";

const WishListOverview = ({
  wishlists,
  startCreatingWishlist,
  isCreatingWishlist
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const numOfWishlists = Object.keys(wishlists).length;
  const wishlistIds = Object.keys(wishlists);

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
        {wishlistIds.map((wishlistId) => (
          <WishlistPreview
            key={wishlistId}
            wishlistId={wishlistId}
            {...wishlists[wishlistId]}
          />
        ))}
        {!numOfWishlists && (
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
  wishlists: selectWishlists(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCreatingWishlist: (newWishlistInfo, onSuccess) =>
    dispatch(createNewWishlist(newWishlistInfo, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListOverview);
