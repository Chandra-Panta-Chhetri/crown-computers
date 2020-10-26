import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const AddCategoryBtn = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
  padding-right: 10px;
`;

export const NewCategoryModal = styled(Modal)`
  ${ModalContent} {
    height: 70%;
  }
`;

export const SubmitCategoryBtn = styled(Button)`
  float: right;
`;
