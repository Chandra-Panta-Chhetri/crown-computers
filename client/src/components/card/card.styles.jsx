import styled from "styled-components";

export const CardContainer = styled.section`
  background: ${(props) => props.theme.backgroundColorLight};
  border-radius: 3px;
  height: ${(props) => props.height};
  position: relative;
  width: ${(props) => props.width};
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
