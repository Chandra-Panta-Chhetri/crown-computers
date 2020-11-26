import styled from "styled-components";

export const JumbotronContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme.secondaryLight};
  width: 100%;
  padding: 25px 50px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 0;
`;

export const Subtitle = styled.h4`
  margin: 5px 0 25px;
  color: ${(props) => props.theme.primaryLight};
`;
