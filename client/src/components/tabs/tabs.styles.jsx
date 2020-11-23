import styled, { css } from "styled-components";
import { mainBorderColor } from "../../global.styles";

const activeTabStyles = css`
  border-color: blue;
  transition: border-color 450ms ease-in-out;
`;

export const TabsContainer = styled.div`
  margin-bottom: 5px;
`;

export const TabHeadings = styled.div`
  display: flex;
  padding-left: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const TabHeading = styled.span`
  cursor: pointer;
  flex-grow: 1;
  border-bottom: 2px solid ${mainBorderColor};
  padding: 8px 20px 8px 0;
  ${(props) => (props.activeTab ? activeTabStyles : null)}
`;
