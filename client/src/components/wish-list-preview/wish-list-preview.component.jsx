import React from "react";
import {
  WishListPreviewContainer,
  WishListCreationDate,
  WishListName,
  ViewWishListBtn,
  Ellipsis,
  PreviewCard,
  StyledRemoveWishListBtn,
  WishListItemPreviewContainer
} from "./wish-list-preview.styles";

import WishListItemPreview from "../wish-list-item-preview/wish-list-item-preview.component";

import { withRouter } from "react-router-dom";

const NUM_ITEMS_TO_SHOW = 3;

const WishListPreview = ({ wishList, history, match }) => {
  const { wishListName, createdAt, items, wishListId } = wishList;

  return (
    <WishListPreviewContainer>
      <PreviewCard>
        <div>
          <WishListName>{wishListName}</WishListName>
          <StyledRemoveWishListBtn wishList={wishList} />
        </div>
        <WishListCreationDate>
          <i className="far fa-calendar-alt"></i> Created On{" "}
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

export default withRouter(WishListPreview);
