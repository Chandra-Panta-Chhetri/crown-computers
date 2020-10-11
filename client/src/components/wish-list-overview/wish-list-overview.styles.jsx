import styled from "styled-components";
import CreateWishListBtn from "../create-wish-list-btn/create-wish-list-btn.component";

export const WishListOverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const StyledCreateWishListBtn = styled(CreateWishListBtn)`
  margin: 0 23px 20px auto;
`;

export const TotalWishListsText = styled.p`
  text-align: left;
  margin-top: 0;
  margin-left: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

export const NoWishListsText = styled.p`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.5px;
`;

export const WishListsContainer = styled.article`
  display: flex;
  height: ${(props) => (!props.numberOfWishLists ? "45vh" : "100%")};
  flex-direction: ${(props) => (!props.numberOfWishLists ? "column" : "row")};
  justify-content: ${(props) =>
    !props.numberOfWishLists ? "center" : "flex-start"};
  flex-wrap: wrap;
`;
