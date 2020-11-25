import React, { useState, useEffect } from "react";
import {
  WishListsModalContainer,
  AddToWishListBtn,
  AddToWishListForm,
  NoWishListsText
} from "./add-to-wish-lists-modal.styles";

import Checkbox from "../checkbox/checkbox.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  selectIsFetchingWishLists,
  selectWishLists
} from "../../redux/wish-list/wish-list.selectors";
import {
  startWishListsFetch,
  addToWishList
} from "../../redux/wish-list/wish-list.actions";

const WishListsModal = ({
  wishLists,
  isFetchingWishList,
  fetchWishLists,
  closeModal,
  itemToAdd,
  addItemToWishList,
  history
}) => {
  const [selectedCheckboxes, setSelectedCheckbox] = useState([]);
  const numOfWishLists = (wishLists || []).length;

  useEffect(() => {
    fetchWishLists();
  }, [fetchWishLists]);

  const addItemToWishLists = (wishLists) => {
    for (let wishList of wishLists) {
      addItemToWishList(itemToAdd, wishList, closeModal);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedWishLists = [];
    for (let checkbox of selectedCheckboxes) {
      selectedWishLists.push(wishLists[checkbox]);
    }
    addItemToWishLists(selectedWishLists);
  };

  const handleWishListSelect = (e) => {
    const { checked, value } = e.target;
    const checkboxes = selectedCheckboxes;
    if (checked) {
      checkboxes.push(+value);
    } else {
      const index = checkboxes.indexOf(+value);
      if (index !== -1) {
        checkboxes.splice(index, 1);
      }
    }
    setSelectedCheckbox([...checkboxes]);
  };

  return (
    <WishListsModalContainer
      isOpen
      closeModalHandler={closeModal}
      modalTitle="Select Wish Lists"
      numOfWishLists={numOfWishLists}
    >
      {isFetchingWishList ? (
        <Spinner loadingText="Getting Latest Wish Lists" />
      ) : (
        <>
          {numOfWishLists > 0 ? (
            <AddToWishListForm onSubmit={handleSubmit}>
              {(wishLists || []).map((wishList, index) => (
                <Checkbox
                  label={wishList.wishListName}
                  key={index}
                  inputChangeHandler={handleWishListSelect}
                  value={index}
                />
              ))}
              <AddToWishListBtn
                type="submit"
                variant="icon"
                iconClass="fas fa-plus"
                disabled={!selectedCheckboxes.length}
              >
                Add To Wish Lists
              </AddToWishListBtn>
            </AddToWishListForm>
          ) : (
            <NoWishListsText>
              It seems you have no wish lists.{" "}
              <span onClick={() => history.push("/wish-lists")}>
                Create wish list
              </span>
            </NoWishListsText>
          )}
        </>
      )}
    </WishListsModalContainer>
  );
};

const mapStateToProps = (state) => ({
  wishLists: selectWishLists(state),
  isFetchingWishList: selectIsFetchingWishLists(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishLists: () => dispatch(startWishListsFetch()),
  addItemToWishList: (item, wishList, onSuccess) =>
    dispatch(addToWishList(item, wishList, onSuccess))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WishListsModal);
