import React, { useState } from "react";
import {
  WishlistPreviewContainer,
  WishlistCreationDate,
  WishlistItemPreview,
  WishlistItemPreviewContainer,
  WishlistName,
  ViewWishlistBtn,
  WishlistItemImage,
  WishlistItemName,
  WishlistItemPrice,
  Ellipsis,
  RemoveWishlistBtn,
  PreviewCard,
  WishlistDeleteModal,
  DeleteModalButtonContainer
} from "./wishlist-preview.styles";
import { LoadingText } from "../card-details-form/card-details-form.styles";

import Button from "../button/button.component";

import { truncate } from "../../redux/cart/cart.sagas";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { deleteWishlistById } from "../../redux/wishlist/wishlist.actions";
import { selectIsUpdatingWishlist } from "../../redux/wishlist/wishlist.selectors";

const NUM_ITEMS_TO_SHOW = 3;

const WishlistPreview = ({
  wishlistName,
  createdAt,
  items,
  history,
  wishlistId,
  match,
  deleteWishlist,
  isDeleting
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <WishlistPreviewContainer>
      <PreviewCard>
        <div>
          <WishlistName>{wishlistName}</WishlistName>
          <RemoveWishlistBtn onClick={() => setIsDeleteModalOpen(true)}>
            <i className="fa fa-trash-alt"></i>
          </RemoveWishlistBtn>
        </div>
        <WishlistCreationDate>
          <i className="far fa-calendar-alt"></i> Created On{" "}
          {createdAt.toDateString()}
        </WishlistCreationDate>
        <WishlistItemPreviewContainer>
          {items
            .slice(0, NUM_ITEMS_TO_SHOW)
            .map(({ name, price, imageUrl }, index) => (
              <WishlistItemPreview key={index}>
                <WishlistItemImage src={imageUrl} alt={name} />
                <WishlistItemName>{truncate(name, 20)}</WishlistItemName>
                <WishlistItemPrice>${price} ea.</WishlistItemPrice>
              </WishlistItemPreview>
            ))}
        </WishlistItemPreviewContainer>
        {items.length > NUM_ITEMS_TO_SHOW && <Ellipsis>...</Ellipsis>}
        <ViewWishlistBtn
          onClick={() => history.push(`${match.path}/${wishlistId}`)}
          isIconButton
          iconClass="fas fa-info-circle"
        >
          Wishlist Details
        </ViewWishlistBtn>
      </PreviewCard>
      <WishlistDeleteModal
        isOpen={isDeleteModalOpen}
        closeModalHandler={() => setIsDeleteModalOpen(false)}
        modalTitle="Wishlist Delete Confirmation"
      >
        <p>
          Deleting {wishlistName} will remove all the items in the wishlist. Are
          you sure you want to delete {wishlistName}?
        </p>
        <DeleteModalButtonContainer>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button
            color="red"
            onClick={() => deleteWishlist(wishlistId)}
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
    </WishlistPreviewContainer>
  );
};

const mapStateToProps = (state) => ({
  isDeleting: selectIsUpdatingWishlist(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteWishlist: (wishlistId) => dispatch(deleteWishlistById(wishlistId))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(WishlistPreview);
