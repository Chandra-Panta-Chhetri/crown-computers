import React, { useState } from "react";
import {
  CreateWishlistModalContainer,
  ConfirmWishlistInfoBtn
} from "./create-wishlist-modal.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";
import FormInput from "../form-input/form-input.component";

import {
  createNewWishlist,
  startWishlistUpdate
} from "../../redux/wishlist/wishlist.actions";
import { selectIsUpdatingWishlist } from "../../redux/wishlist/wishlist.selectors";
import { connect } from "react-redux";

const CreateWishlistModal = ({
  startCreatingWishlist,
  isCreatingWishlist,
  closeModalHandler,
  modalTitle,
  updateWishlist,
  isEditingWishlist = false,
  defaultWishlist = { wishlistName: "" },
  wishlistId
}) => {
  const [wishlistName, setWishlistName] = useState(
    defaultWishlist.wishlistName
  );

  const createWishlist = (e) => {
    e.preventDefault();
    if (!isEditingWishlist) {
      return startCreatingWishlist({ wishlistName }, closeModalHandler);
    }
    if (defaultWishlist.wishlistName !== wishlistName) {
      updateWishlist({ wishlistName }, wishlistId, closeModalHandler);
    }
  };

  const handleChange = (e) => setWishlistName(e.target.value);

  return (
    <CreateWishlistModalContainer
      isOpen={true}
      closeModalHandler={closeModalHandler}
      modalTitle={modalTitle}
    >
      <form onSubmit={createWishlist}>
        <FormInput
          label="Wishlist Name"
          inputValue={wishlistName}
          inputChangeHandler={handleChange}
          required
        />
        <ConfirmWishlistInfoBtn type="submit" disabled={isCreatingWishlist}>
          {isCreatingWishlist ? (
            <LoadingText>
              {isEditingWishlist ? "Creating Wishlist" : "Updating Wishlist"}
            </LoadingText>
          ) : isEditingWishlist ? (
            "Update Wishlist"
          ) : (
            "Create Wishlist"
          )}
        </ConfirmWishlistInfoBtn>
      </form>
    </CreateWishlistModalContainer>
  );
};

const mapStateToProps = (state) => ({
  isCreatingWishlist: selectIsUpdatingWishlist(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCreatingWishlist: (newWishlistInfo, onSuccess) =>
    dispatch(createNewWishlist(newWishlistInfo, onSuccess)),
  updateWishlist: (updatedWishlist, wishlistId, onSuccess) =>
    dispatch(startWishlistUpdate(updatedWishlist, wishlistId, onSuccess))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWishlistModal);
