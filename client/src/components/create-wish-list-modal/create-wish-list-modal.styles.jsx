import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const CreateWishListModalContainer = styled(Modal)`
  ${ModalContent} {
    height: 54%;
  }

  @media only screen and (max-width: 1000px) {
    ${ModalContent} {
      height: 90%;
      width: 90%;
    }
  }
`;

export const ConfirmWishListInfoBtn = styled(Button)`
  float: right;

  @media only screen and (max-width: 500px) {
    width: 100%;
    margin-top: auto;
  }
`;
