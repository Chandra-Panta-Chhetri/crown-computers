import React, { useState, useEffect } from "react";
import {
  WishListsModalContainer,
  AddItemToWishListBtn,
  AddToWishListForm
} from "./wish-lists-modal.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import Checkbox from "../checkbox/checkbox.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import {
  selectIsUpdatingWishList,
  selectIsFetchingWishLists,
  selectWishLists
} from "../../redux/wish-list/wish-list.selectors";
import { startWishListsFetch } from "../../redux/wish-list/wish-list.actions";

const WishListsModal = ({
  wishLists,
  isUpdatingWishList,
  isFetchingWishList,
  fetchWishLists,
  closeModal,
  submitHandler = () => {}
}) => {
  const [selectedCheckboxes, setSelectedCheckbox] = useState([]);

  useEffect(() => {
    if (wishLists.length) {
      return;
    }
    fetchWishLists();
  }, [fetchWishLists, wishLists]);

  const handleWishListSelect = (e) => {
    const { checked, value } = e.target;
    const options = selectedCheckboxes;
    if (checked) {
      options.push(+value);
    } else {
      const index = options.indexOf(+value);
      if (index !== -1) {
        options.splice(index, 1);
      }
    }
    setSelectedCheckbox([...options]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedWishLists = [];
    for (let selectedCheckbox of selectedCheckboxes) {
      selectedWishLists.push(wishLists[selectedCheckbox]);
    }
    submitHandler(selectedWishLists);
  };

  return (
    <WishListsModalContainer
      isOpen={true}
      closeModalHandler={closeModal}
      modalTitle="Select Wish List(s)"
    >
      {isFetchingWishList ? (
        <Spinner loadingText="Getting Latest Wish Lists" />
      ) : (
        <AddToWishListForm onSubmit={handleSubmit}>
          {(wishLists || []).map((wishList, index) => (
            <Checkbox
              label={wishList.wishListName}
              key={index}
              inputChangeHandler={handleWishListSelect}
              value={index}
            />
          ))}
          <AddItemToWishListBtn
            type="submit"
            variant="icon"
            iconClass="fas fa-plus"
            disabled={isUpdatingWishList || !selectedCheckboxes.length}
          >
            {isUpdatingWishList ? (
              <LoadingText>Adding To Wish List(s)</LoadingText>
            ) : (
              "Add To Wish List(s)"
            )}
          </AddItemToWishListBtn>
        </AddToWishListForm>
      )}
    </WishListsModalContainer>
  );
};

const mapStateToProps = (state) => ({
  wishLists: selectWishLists(state),
  isUpdatingWishList: selectIsUpdatingWishList(state),
  isFetchingWishList: selectIsFetchingWishLists(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishLists: () => dispatch(startWishListsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListsModal);
