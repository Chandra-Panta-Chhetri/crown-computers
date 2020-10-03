import styled from "styled-components";
import Button from "../button/button.component";

export const WishlistOverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CreateWishlistBtn = styled(Button)`
  margin: 0 23px 20px auto;
  padding-right: 1.2rem;

  i {
    width: 14%;
  }
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