import styled from "styled-components";
import Card from "../card/card.component";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";
import { DeleteIcon } from "../delete-confirmation-modal/delete-confirmation-modal.styles";

export const CategoryEntryContainer = styled.article`
  flex-grow: 1;
  width: 28%;
  margin: 0 10px 40px;
  position: relative;
`;

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    text-transform: capitalize;
    margin-top: 3px;
    font-weight: bold;
  }
`;

export const DeleteCategoryIcon = styled(DeleteConfirmationModal)`
  ${DeleteIcon} {
    position: absolute;
    top: 1px;
    right: 5px;
  }
`;

export const CategoryImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;
