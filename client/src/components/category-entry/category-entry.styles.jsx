import styled from "styled-components";
import Card from "../card/card.component";

export const CategoryEntryContainer = styled.article`
  flex-grow: 1;
  width: 28%;
  margin: 0 10px 40px;
`;

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    text-transform: capitalize;
    margin-top: 3px;
    font-weight: bold;
  }
`;

export const CategoryImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;
