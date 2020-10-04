import React, { useState } from "react";
import {
  WishlistDeleteModal,
  DeleteModalButtonContainer,
  DeleteIcon
} from "./remove-wishlist-btn.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import Button from "../button/button.component";

import { deleteWishlistById } from "../../redux/wishlist/wishlist.actions";
import { selectIsUpdatingWishlist } from "../../redux/wishlist/wishlist.selectors";
import { connect } from "react-redux";

const RemoveWishlistBtn = ({
  wishlistId,
  wishlistName,
  deleteWishlist,
  isDeleting,
  className
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <DeleteIcon
        onClick={() => setIsDeleteModalOpen(true)}
        className={className}
      >
        <i className="fa fa-trash-alt"></i>
      </DeleteIcon>
      <WishlistDeleteModal
        isOpen={isDeleteModalOpen}
        closeModalHandler={closeModal}
        modalTitle="Wishlist Delete Confirmation"
      >
        <p>
          Deleting {wishlistName} will remove all the items in the wishlist. Are
          you sure you want to delete {wishlistName}?
        </p>
        <DeleteModalButtonContainer>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            color="red"
            onClick={() => deleteWishlist(wishlistId, wishlistName, closeModal)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <LoadingText>Deleting Wishlist</LoadingText>
            ) : (
              "Delete Wishlist"
            )}
          </Button>
        </DeleteModalButtonContainer>
      </WishlistDeleteModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  isDeleting: selectIsUpdatingWishlist(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteWishlist: (wishlistId, wishlistName) =>
    dispatch(deleteWishlistById(wishlistId, wishlistName))
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveWishlistBtn);
