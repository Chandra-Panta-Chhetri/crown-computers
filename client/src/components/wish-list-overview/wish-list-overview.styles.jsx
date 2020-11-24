import styled from "styled-components";
import CreateWishListBtn from "../create-wish-list-btn/create-wish-list-btn.component";

export const WishListOverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const StyledCreateWishListBtn = styled(CreateWishListBtn)`
  margin: 0 1.2em 20px auto;
  padding-right: 0.8rem;

  @media only screen and (max-width: 750px) {
    margin-right: 0;
  }

  @media only screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const TotalWishListsText = styled.p`
  text-align: left;
  margin-top: 0;
  margin-left: 12px;
  font-weight: bold;
  letter-spacing: 1.5px;

  @media only screen and (max-width: 750px) {
    margin: 0 0 10px;
  }
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

  @media only screen and (max-width: 550px) {
    flex-direction: ${(props) => (!props.numberOfWishLists ? "row" : "column")};
  }
`;
