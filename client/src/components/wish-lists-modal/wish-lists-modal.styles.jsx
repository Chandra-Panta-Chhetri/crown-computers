import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalBody } from "../modal/modal.styles";

export const WishListsModalContainer = styled(Modal)`
  ${ModalBody} {
    height: 80%;
  }
`;

export const AddToWishListForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const AddItemToWishListBtn = styled(Button)`
  width: 100%;
  justify-content: center;
  margin-top: auto;
`;
