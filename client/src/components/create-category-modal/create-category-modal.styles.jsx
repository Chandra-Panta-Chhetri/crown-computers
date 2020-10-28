import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const NewCategoryModal = styled(Modal)`
  ${ModalContent} {
    height: 70%;
  }
`;

export const SubmitCategoryBtn = styled(Button)`
  float: right;
`;
