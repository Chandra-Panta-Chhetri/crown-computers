import styled from "styled-components";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const DeleteIcon = styled.span`
  cursor: pointer;
  color: red;
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
