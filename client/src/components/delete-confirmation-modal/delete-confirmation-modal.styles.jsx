import styled from "styled-components";
import Modal from "../modal/modal.component";
import { ModalContent, ModalBody } from "../modal/modal.styles";

export const DeleteModalContainer = styled(Modal)`
  ${ModalContent} {
    height: 50%;
  }

  @media only screen and (max-width: 1000px) {
    ${ModalContent} {
      height: 90% !important;
      width: 90%;
    }
  }

  ${ModalBody} {
    flex-grow: 1;
  }
`;

export const DeleteIcon = styled.span`
  cursor: pointer;
  color: red;

  i:hover {
    transform: scale(1.3);
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;

  button:first-child {
    margin-right: 30px;
  }

  @media only screen and (max-width: 530px) {
    flex-direction: column-reverse;

    button:first-child {
      margin: 20px 0 0;
    }
  }
`;
