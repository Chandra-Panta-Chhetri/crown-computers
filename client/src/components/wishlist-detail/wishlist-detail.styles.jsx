import styled from "styled-components";
import Button from "../button/button.component";

export const WishlistDetailContainer = styled.article``;

export const BackToWishlistsBtn = styled(Button)`
  margin-bottom: 25px;

  i {
    width: 13%;
  }
`;

export const WishlistTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

export const AddAllToCart = styled(Button)`
  margin-top: 30px;
`;
