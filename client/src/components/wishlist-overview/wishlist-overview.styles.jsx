import styled from "styled-components";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import { ModalContent } from "../modal/modal.styles";

export const WishlistOverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const NewWishlistBtn = styled(Button)`
  margin: 0 23px 20px auto;
  padding-right: 1rem;
`;

export const CreateWishlistModal = styled(Modal)`
  ${ModalContent} {
    height: 52%;
  }
`;

export const CreateWishlistBtn = styled(Button)`
  float: right;
`;

export const NoWishlistsText = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

export const WishlistsContainer = styled.article`
  display: flex;
  height: ${(props) => (!props.numberOfWishlists ? "45vh" : "100%")};
  flex-direction: ${(props) => (!props.numberOfWishlists ? "column" : "row")};
  justify-content: ${(props) =>
    !props.numberOfWishlists ? "center" : "flex-start"};
  flex-wrap: wrap;
`;
