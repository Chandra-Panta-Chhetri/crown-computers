import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const NewWishlistBtn = styled(Button)`
  padding-right: 1rem;
`;

export const CreateWishlistModal = styled(Modal)`
  ${ModalContent} {
    height: 52%;
  }
`;

export const ConfirmWishlistInfoBtn = styled(Button)`
  float: right;
`;
