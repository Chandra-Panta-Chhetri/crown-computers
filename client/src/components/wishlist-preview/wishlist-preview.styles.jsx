import styled from "styled-components";
import Button from "../button/button.component";
import Card from "../card/card.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const WishlistPreviewContainer = styled.section`
  width: 33%;
  padding: 0.8em;
  min-height: 430px;
`;

export const PreviewCard = styled(Card)`
  position: relative;
`;

export const RemoveWishlistBtn = styled.span`
  cursor: pointer;
  color: red;
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

export const WishlistName = styled.p`
  margin: 0 0 5px;
  font-weight: bold;
  text-transform: capitalize;
`;

export const WishlistCreationDate = styled.p`
  margin-top: 2px;
  font-weight: bold;
`;

export const WishlistItemPreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  div:last-child {
    margin-bottom: 0;
  }
`;

export const WishlistItemPreview = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const WishlistItemImage = styled.img`
  width: 40px;
  margin-right: 10px;
`;

export const WishlistItemName = styled.span`
  flex-grow: 1;
  text-transform: capitalize;
`;

export const WishlistItemPrice = styled.span`
  white-space: nowrap;
`;

export const Ellipsis = styled.span`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

export const ViewWishlistBtn = styled(Button)`
  margin-top: auto;
`;

export const WishlistDeleteModal = styled(Modal)`
  ${ModalContent} {
    height: 50%;
  }
`;

export const DeleteModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 30px;
  }
`;
