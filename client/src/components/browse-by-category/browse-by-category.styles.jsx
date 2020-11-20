import styled from "styled-components";

export const BrowseByCategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 850px) {
    flex-direction: row;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
