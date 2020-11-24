import styled from "styled-components";

export const ProductCollectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 850px) {
    flex-direction: row;
  }

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;
