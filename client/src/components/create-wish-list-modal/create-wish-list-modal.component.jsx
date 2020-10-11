import React, { useState } from "react";
import {
  CreateWishListModalContainer,
  ConfirmWishListInfoBtn
} from "./create-wish-list-modal.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import FormInput from "../form-input/form-input.component";

import {
  createNewWishList,
  startWishListUpdate
} from "../../redux/wish-list/wish-list.actions";
import { selectIsUpdatingWishList } from "../../redux/wish-list/wish-list.selectors";
import { connect } from "react-redux";

const CreateWishListModal = ({
  createWishList,
  isCreatingWishList,
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
      isOpen={true}
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
          disabled={
            isCreatingWishList || defaultWishList.wishListName === wishListName
          }
        >
          {isCreatingWishList ? (
            <LoadingText>
              {isEditingWishList ? "Creating Wish List" : "Updating Wish List"}
            </LoadingText>
          ) : isEditingWishList ? (
            "Update Wish List"
          ) : (
            "Create Wish List"
          )}
        </ConfirmWishListInfoBtn>
      </form>
    </CreateWishListModalContainer>
  );
};

const mapStateToProps = (state) => ({
  isCreatingWishList: selectIsUpdatingWishList(state)
});

const mapDispatchToProps = (dispatch) => ({
  createWishList: (newWishListInfo, onSuccess) =>
    dispatch(createNewWishList(newWishListInfo, onSuccess)),
  updateWishList: (updatedWishlist, wishListId, onSuccess) =>
    dispatch(startWishListUpdate(updatedWishlist, wishListId, onSuccess))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWishListModal);
