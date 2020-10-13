import React, { useState, useEffect } from "react";
import {
  WishListsModalContainer,
  AddItemToWishListBtn,
  AddToWishListForm,
  NoWishListsText
} from "./wish-lists-modal.styles";

import Checkbox from "../checkbox/checkbox.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import {
  selectIsFetchingWishLists,
  selectWishLists
} from "../../redux/wish-list/wish-list.selectors";
import { startWishListsFetch } from "../../redux/wish-list/wish-list.actions";

const WishListsModal = ({
  wishLists,
  isFetchingWishList,
  fetchWishLists,
  closeModal,
  history,
  submitHandler = () => {}
}) => {
  const [selectedCheckboxes, setSelectedCheckbox] = useState([]);
  const numOfWishLists = (wishLists || []).length;

  useEffect(() => {
    if (wishLists.length) {
      return;
    }
    fetchWishLists();
  }, [fetchWishLists]);

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
      modalTitle="Select Wish Lists"
      numOfWishLists={numOfWishLists}
    >
      {isFetchingWishList ? (
        <Spinner loadingText="Getting Latest Wish Lists" />
      ) : (
        <>
          {numOfWishLists > 0 && (
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
                disabled={!selectedCheckboxes.length}
              >
                Add To Wish Lists
              </AddItemToWishListBtn>
            </AddToWishListForm>
          )}
          {numOfWishLists === 0 && (
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
  fetchWishLists: () => dispatch(startWishListsFetch())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WishListsModal);
