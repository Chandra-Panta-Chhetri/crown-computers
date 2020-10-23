import React from "react";
import {
  WishListPreviewContainer,
  WishListCreationDate,
  WishListName,
  ViewWishListBtn,
  Ellipsis,
  PreviewCard,
  RemoveWishListBtn,
  WishListItemPreviewContainer
} from "./wish-list-preview.styles";

import WishListItemPreview from "../wish-list-item-preview/wish-list-item-preview.component";

import { deleteWishListById } from "../../redux/wish-list/wish-list.actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const NUM_ITEMS_TO_SHOW = 3;

const WishListPreview = ({ wishList, history, match, deleteWishList }) => {
  const { wishListName, createdAt, items, wishListId } = wishList;

  return (
    <WishListPreviewContainer>
      <PreviewCard>
        <div>
          <WishListName>{wishListName}</WishListName>
          <RemoveWishListBtn
            wishList={wishList}
            modalTitle="Wish List Delete Confirmation"
            confirmButtonText="Delete Wish List"
            onConfirmation={() => deleteWishList(wishList)}
          >
            <p>
              Are you sure you want to delete{" "}
              <span>{wishList.wishListName}</span>? Deleting will remove all the
              items in the wish list.
            </p>
          </RemoveWishListBtn>
        </div>
        <WishListCreationDate>
          <i className="far fa-calendar-alt" /> Created On{" "}
          {createdAt.toDateString()}
        </WishListCreationDate>
        <WishListItemPreviewContainer>
          {(items || []).slice(0, NUM_ITEMS_TO_SHOW).map((item, index) => (
            <WishListItemPreview key={index} item={item} />
          ))}
        </WishListItemPreviewContainer>
        {(items || []).length > NUM_ITEMS_TO_SHOW && <Ellipsis>...</Ellipsis>}
        <ViewWishListBtn
          onClick={() => history.push(`${match.path}/${wishListId}`)}
          variant="icon"
          iconClass="fas fa-info-circle"
        >
          Wish List Details
        </ViewWishListBtn>
      </PreviewCard>
    </WishListPreviewContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteWishList: (wishListToDelete) =>
    dispatch(deleteWishListById(wishListToDelete))
});

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(WishListPreview);
