import styled from "styled-components";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const DeleteModalContainer = styled(Modal)`
  ${ModalContent} {
    height: 50%;
  }
`;

export const DeleteIcon = styled.span`
  cursor: pointer;
  color: red;

  &:hover {
    transform: scale(1.3);
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 30px;
  }
`;
