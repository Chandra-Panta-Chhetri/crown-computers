import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const NewCategoryModal = styled(Modal)`
  ${ModalContent} {
    height: 85%;
    margin-top: 25px;
  }
`;

export const SubmitCategoryBtn = styled(Button)`
  float: right;

  @media only screen and (max-width: 550px) {
    width: 100%;
    margin-top: auto;
  }
`;
