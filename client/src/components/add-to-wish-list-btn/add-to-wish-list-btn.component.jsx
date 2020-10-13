import React, { useState } from "react";
import { AddToWishListIcon } from "./add-to-wish-list.styles";

import { connect } from "react-redux";
import { addToWishList } from "../../redux/wish-list/wish-list.actions";

import WishListsModal from "../wish-lists-modal/wish-lists-modal.component";

const AddToWishListBtn = ({
  addItemToWishList,
  itemToAddOnClick,
  className
}) => {
  const [isWishListsModalOpen, setIsWishListsModalOpen] = useState(false);

  const closeModal = () => setIsWishListsModalOpen(false);
  const addItemToWishLists = (wishLists) => {
    for (let wishList of wishLists) {
      addItemToWishList(itemToAddOnClick, wishList, closeModal);
    }
  };

  return (
    <>
      <AddToWishListIcon
        onClick={() => setIsWishListsModalOpen(true)}
        className={`${className} far fa-bookmark`}
      />
      {isWishListsModalOpen && (
        <WishListsModal
          closeModal={closeModal}
          submitHandler={addItemToWishLists}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToWishList: (item, wishList, onSuccess) =>
    dispatch(addToWishList(item, wishList, onSuccess))
});

export default connect(null, mapDispatchToProps)(AddToWishListBtn);
