import React from "react";
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
  PreviewCard
} from "./wishlist-preview.styles";

import { truncate } from "../../redux/cart/cart.sagas";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const NUM_ITEMS_TO_SHOW = 3;

const WishlistPreview = ({
  wishlistName,
  createdAt,
  items,
  history,
  wishlistId
}) => (
  <WishlistPreviewContainer>
    <PreviewCard>
      <div>
        <WishlistName>{wishlistName}</WishlistName>

        <RemoveWishlistBtn>
          <i className="fa fa-trash-alt"></i>
        </RemoveWishlistBtn>
      </div>
      <WishlistCreationDate>
        <i className="far fa-calendar-alt"></i> Created On{" "}
        {createdAt.toDateString()}
      </WishlistCreationDate>
      <WishlistItemPreviewContainer>
        {items.slice(0, NUM_ITEMS_TO_SHOW).map(({ name, price, imageUrl }) => (
          <WishlistItemPreview>
            <WishlistItemImage src={imageUrl} alt={name} />
            <WishlistItemName>{truncate(name, 20)}</WishlistItemName>
            <WishlistItemPrice>${price} ea.</WishlistItemPrice>
          </WishlistItemPreview>
        ))}
      </WishlistItemPreviewContainer>
      {items.length > NUM_ITEMS_TO_SHOW && <Ellipsis>...</Ellipsis>}
      <ViewWishlistBtn onClick={() => history.push(`wishlists/${wishlistId}`)}>
        Wishlist Details
      </ViewWishlistBtn>
    </PreviewCard>
  </WishlistPreviewContainer>
);

export default compose(connect(), withRouter)(WishlistPreview);
