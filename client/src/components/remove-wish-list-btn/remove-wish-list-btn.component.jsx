import React, { useState } from "react";
import {
  WishListDeleteModal,
  DeleteModalButtonContainer,
  DeleteIcon
} from "./remove-wish-list-btn.styles";

import Button from "../button/button.component";

import { deleteWishListById } from "../../redux/wish-list/wish-list.actions";
import { connect } from "react-redux";

const RemoveWishListBtn = ({ wishList, deleteWishList, className }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <DeleteIcon
        onClick={() => setIsDeleteModalOpen(true)}
        className={className}
      >
        <i className="fa fa-trash-alt"></i>
      </DeleteIcon>
      <WishListDeleteModal
        isOpen={isDeleteModalOpen}
        closeModalHandler={closeDeleteModal}
        modalTitle="Wish List Delete Confirmation"
      >
        <p>
          Deleting <span>{wishList.wishListName}</span> will remove all the
          items in the wish list. Are you sure you want to delete{" "}
          <span>{wishList.wishListName}</span>?
        </p>
        <DeleteModalButtonContainer>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={() => deleteWishList(wishList)}>
            Delete Wish List
          </Button>
        </DeleteModalButtonContainer>
      </WishListDeleteModal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteWishList: (wishListToDelete) =>
    dispatch(deleteWishListById(wishListToDelete))
});

export default connect(null, mapDispatchToProps)(RemoveWishListBtn);
