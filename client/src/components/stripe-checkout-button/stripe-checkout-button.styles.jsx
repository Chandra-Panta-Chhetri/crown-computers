import styled from "styled-components";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const CheckoutModal = styled(Modal)`
  ${ModalContent} {
    width: 60%;
  }

  @media only screen and (max-width: 1000px) {
    padding-top: 35px;
  }
`;
