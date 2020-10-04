import React, { useState } from "react";
import {
  NewWishlistBtn,
  CreateWishlistModal,
  ConfirmWishlistInfoBtn
} from "./create-wishlist-btn.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import FormInput from "../form-input/form-input.component";

import { createNewWishlist } from "../../redux/wishlist/wishlist.actions";
import { selectIsUpdatingWishlist } from "../../redux/wishlist/wishlist.selectors";
import { connect } from "react-redux";

const CreateWishlistBtn = ({
  startCreatingWishlist,
  isCreatingWishlist,
  className
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");

  const createWishlist = (e) => {
    e.preventDefault();
    startCreatingWishlist({ wishlistName: newWishlistName }, closeModal);
  };

  const handleChange = (e) => setNewWishlistName(e.target.value);

  const closeModal = () => {
    setIsAddModalOpen(false);
    setNewWishlistName("");
  };

  return (
    <>
      <NewWishlistBtn
        className={className}
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
          <ConfirmWishlistInfoBtn type="submit" disabled={isCreatingWishlist}>
            {isCreatingWishlist ? (
              <LoadingText>Creating Wishlist</LoadingText>
            ) : (
              "Create Wishlist"
            )}
          </ConfirmWishlistInfoBtn>
        </form>
      </CreateWishlistModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  isCreatingWishlist: selectIsUpdatingWishlist(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCreatingWishlist: (newWishlistInfo, onSuccess) =>
    dispatch(createNewWishlist(newWishlistInfo, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWishlistBtn);
