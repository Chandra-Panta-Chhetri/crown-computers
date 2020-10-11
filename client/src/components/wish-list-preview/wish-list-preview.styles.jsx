import styled from "styled-components";
import Card from "../card/card.component";
import Button from "../button/button.component";
import RemoveWishListBtn from "../remove-wish-list-btn/remove-wish-list-btn.component";

export const WishListPreviewContainer = styled.section`
  width: 33%;
  padding: 0.8em;
  min-height: 430px;
`;

export const PreviewCard = styled(Card)`
  position: relative;
`;

export const StyledRemoveWishListBtn = styled(RemoveWishListBtn)`
  position: absolute;
  top: 15px;
  right: 12px;

  &:hover {
    transform: scale(1.3);
  }

  i {
    font-size: 1.27rem;
  }
`;

export const WishListName = styled.p`
  margin: 0 0 5px;
  font-weight: bold;
  text-transform: capitalize;
`;

export const WishListCreationDate = styled.p`
  margin-top: 2px;
  font-weight: bold;
`;

export const WishListItemPreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  div:last-child {
    margin-bottom: 0;
  }
`;

export const Ellipsis = styled.span`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

export const ViewWishListBtn = styled(Button)`
  margin-top: auto;
`;
