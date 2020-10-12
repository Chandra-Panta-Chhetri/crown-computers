import React, { useState } from "react";

import Button from "../button/button.component";

import { connect } from "react-redux";
import { selectIsUpdatingWishList } from "../../redux/wish-list/wish-list.selectors";
import { addToWishList } from "../../redux/wish-list/wish-list.actions";

import WishListsModal from "../wish-lists-modal/wish-lists-modal.component";

const AddToWishListBtn = ({
  isUpdatingWishList,
  addItemToWishList,
  itemToAddOnClick,
  className
}) => {
  const [isWishListsModalOpen, setIsWishListsModalOpen] = useState(false);

  const addItemToWishLists = (wishLists) => {
    for (let wishList of wishLists) {
      addItemToWishList(itemToAddOnClick, wishList);
    }
  };

  const closeModal = () => setIsWishListsModalOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsWishListsModalOpen(true)}
        className={className}
        disabled={isUpdatingWishList}
      >
        Add To Wish List(s)
      </Button>
      {isWishListsModalOpen && (
        <WishListsModal
          closeModal={closeModal}
          submitHandler={addItemToWishLists}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isUpdatingWishList: selectIsUpdatingWishList(state)
});

const mapDispatchToProps = (dispatch) => ({
  addItemToWishList: (item, wishList) => dispatch(addToWishList(item, wishList))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToWishListBtn);
