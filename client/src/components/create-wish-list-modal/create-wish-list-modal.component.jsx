import React, { useState } from "react";
import {
  CreateWishListModalContainer,
  ConfirmWishListInfoBtn
} from "./create-wish-list-modal.styles";

import FormInput from "../form-input/form-input.component";

import {
  createNewWishList,
  startWishListUpdate
} from "../../redux/wish-list/wish-list.actions";
import { connect } from "react-redux";

const CreateWishListModal = ({
  createWishList,
  closeModalHandler,
  modalTitle,
  updateWishList,
  isEditingWishList = false,
  defaultWishList = { wishListName: "" }
}) => {
  const [wishListName, setWishListName] = useState(
    defaultWishList.wishListName
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditingWishList) {
      return createWishList({ wishListName }, closeModalHandler);
    }
    updateWishList(
      { wishListName },
      defaultWishList.wishListId,
      closeModalHandler
    );
  };

  const handleChange = (e) => setWishListName(e.target.value);

  return (
    <CreateWishListModalContainer
      isOpen
      closeModalHandler={closeModalHandler}
      modalTitle={modalTitle}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Wish List Name"
          inputValue={wishListName}
          inputChangeHandler={handleChange}
          required
        />
        <ConfirmWishListInfoBtn
          type="submit"
          disabled={defaultWishList.wishListName === wishListName}
        >
          {isEditingWishList ? "Update Wish List" : "Create Wish List"}
        </ConfirmWishListInfoBtn>
      </form>
    </CreateWishListModalContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createWishList: (newWishListInfo, onSuccess) =>
    dispatch(createNewWishList(newWishListInfo, onSuccess)),
  updateWishList: (updatedWishList, wishListId, onSuccess) =>
    dispatch(startWishListUpdate(updatedWishList, wishListId, onSuccess))
});

export default connect(null, mapDispatchToProps)(CreateWishListModal);
