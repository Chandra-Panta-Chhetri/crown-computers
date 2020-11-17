import styled from "styled-components";
import { secondaryColor } from "../../global.styles";
import Card from "../card/card.component";

export const CategoryEntryContainer = styled.article`
  width: 33.33%;
  padding: 0.7rem;
  position: relative;
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

export const CategoryActionContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 3px;
  right: 5px;
`;

export const EditCategoryIcon = styled.i`
  cursor: pointer;
  color: ${secondaryColor};
  margin-right: 10px;

  &:hover {
    transform: scale(1.3);
  }
`;

export const CategoryImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;
