import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const NewProductModal = styled(Modal)`
  ${ModalContent} {
    height: 90%;
  }
`;

export const SubmitProductBtn = styled(Button)`
  float: right;
`;
