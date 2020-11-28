import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalBody } from "../modal/modal.styles";

export const WishListsModalContainer = styled(Modal)`
  ${ModalBody} {
    height: 80%;
    align-items: ${(props) =>
      props.numOfWishLists > 0 ? "flex-start" : "center"};
    justify-content: ${(props) =>
      props.numOfWishLists > 0 ? "flex-start" : "center"};
  }
`;

export const AddToWishListForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AddToWishListBtn = styled(Button)`
  width: 100%;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 10px;

  i {
    width: 15%;
  }
`;

export const NoWishListsText = styled.p`
  font-size: 17px;
  text-transform: none;
  text-align: center;

  span {
    color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
`;
