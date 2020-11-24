import styled from "styled-components";
import Card from "../card/card.component";
import Button from "../button/button.component";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";
import { ModalBody } from "../modal/modal.styles";
import { DeleteIcon } from "../delete-confirmation-modal/delete-confirmation-modal.styles";

export const WishListPreviewContainer = styled.section`
  width: 33%;
  padding: 0.8em;

  @media only screen and (max-width: 850px) {
    width: 50%;
  }

  @media only screen and (max-width: 750px) {
    width: 100%;
    padding: 0 0 1em;
  }
`;

export const PreviewCard = styled(Card)`
  position: relative;
`;

export const RemoveWishListBtn = styled(DeleteConfirmationModal)`
  ${DeleteIcon} {
    position: absolute;
    top: 15px;
    right: 12px;

    i {
      font-size: 1.27rem;
    }
  }

  ${ModalBody} {
    p span {
      font-weight: bold;
    }
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
  min-height: 250px;

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
