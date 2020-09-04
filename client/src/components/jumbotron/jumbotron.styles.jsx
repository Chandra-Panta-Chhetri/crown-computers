import styled from "styled-components";
import { secondaryColorLight, mainColorLight } from "../../global.styles";

export const JumbotronContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  background-color: ${secondaryColorLight};
  width: 100%;
  padding: 25px 50px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 0;
`;

export const SubTitle = styled.h4`
  margin: 5px 0 40px;
  color: ${mainColorLight};
`;
