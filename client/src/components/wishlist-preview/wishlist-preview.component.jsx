import React from "react";
import {
  WishlistPreviewContainer,
  WishlistCreationDate,
  WishlistName,
  ViewWishlistBtn,
  Ellipsis,
  PreviewCard,
  StyledRemoveWishlistBtn,
  WishlistItemPreviewContainer
} from "./wishlist-preview.styles";

import WishlistItemPreview from "../wishlist-item-preview/wishlist-item-preview.component";

import { withRouter } from "react-router-dom";

const NUM_ITEMS_TO_SHOW = 3;

const WishlistPreview = ({
  wishlistName,
  createdAt,
  items,
  history,
  wishlistId,
  match
}) => (
  <WishlistPreviewContainer>
    <PreviewCard>
      <div>
        <WishlistName>{wishlistName}</WishlistName>
        <StyledRemoveWishlistBtn
          wishlistId={wishlistId}
          wishlistName={wishlistName}
        />
      </div>
      <WishlistCreationDate>
        <i className="far fa-calendar-alt"></i> Created On{" "}
        {createdAt.toDateString()}
      </WishlistCreationDate>
      <WishlistItemPreviewContainer>
        {items
          .slice(0, NUM_ITEMS_TO_SHOW)
          .map(({ name, price, imageUrls }, index) => (
            <WishlistItemPreview
              key={index}
              name={name}
              price={price}
              imageUrl={imageUrls[0]}
            />
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
  </WishlistPreviewContainer>
);

export default withRouter(WishlistPreview);
