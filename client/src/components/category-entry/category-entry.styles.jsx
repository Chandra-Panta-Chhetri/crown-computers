import styled from "styled-components";

import Card from "../card/card.component";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";
import { ModalContent } from "../modal/modal.styles";

export const CategoryEntryContainer = styled.article`
  width: 33.33%;
  padding: 0.7rem;
  position: relative;

  @media only screen and (max-width: 900px) {
    width: 50%;
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    padding: 0;
    margin-bottom: 45px;
  }
`;

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    text-transform: capitalize;
    margin-top: 3px;
    font-weight: bold;
    width: 100%;
    text-align: center;
  }
`;

export const CategoryActionContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 3px;
  right: 5px;
`;

export const DeleteCategoryModal = styled(DeleteConfirmationModal)`
  ${ModalContent} {
    margin-top: 20px;
  }
`;

export const EditCategoryIcon = styled.i`
  cursor: pointer;
  color: ${(props) => props.theme.secondary};
  margin-right: 10px;

  &:hover {
    transform: scale(1.3);
  }
`;

export const CategoryImagePreview = styled.img`
  width: 100%;
  height: 200px;
`;
