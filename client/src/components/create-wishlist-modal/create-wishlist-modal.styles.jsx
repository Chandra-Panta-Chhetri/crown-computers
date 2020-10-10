import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const CreateWishlistModalContainer = styled(Modal)`
  ${ModalContent} {
    height: 52%;
  }
`;

export const ConfirmWishlistInfoBtn = styled(Button)`
  float: right;
`;