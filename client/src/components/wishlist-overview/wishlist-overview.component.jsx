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
import { selectIsUpdatingWishlist } from "../../redux/wishlist/wishlist.selectors";

const testWishlists = [
  {
    wishlistName: "Test",
    createdAt: new Date(),
    items: [
      {
        name: "Sample product Testing Some super long name",
        price: 35.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1235.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1000.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1235.0,
        imageUrl: "https://dummyimage.com/400"
      }
    ]
  }
];

const WishListOverview = ({
  wishlists = testWishlists,
  startCreatingWishlist,
  isCreatingWishlist
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const numOfWishlists = wishlists.length;
  const [newWishlistName, setNewWishlistName] = useState("");

  const createWishlist = (e) => {
    e.preventDefault();
    //startCreatingWishlist({wishlistName: newWishlistName})
    console.log(newWishlistName);
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
        closeModalHandler={() => setIsAddModalOpen(false)}
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
        {wishlists.map(({ wishlistName, createdAt, items }, index) => (
          <WishlistPreview
            key={index}
            wishlistName={wishlistName}
            createdAt={createdAt}
            items={items}
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
  isCreatingWishlist: selectIsUpdatingWishlist(state)
});

const mapDispatchToProps = (dispatch) => ({
  createWishlist: (newWishlistInfo) =>
    dispatch(createNewWishlist(newWishlistInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListOverview);
