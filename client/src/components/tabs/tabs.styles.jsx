import styled, { css } from "styled-components";

const borderColor = "rgba(226, 232, 240, 1)";
const activeTabStyles = css`
  border-color: blue;
  transition: border-color 450ms ease-in-out;
`;

export const TabsContainer = styled.div`
  margin-bottom: 5px;
`;

export const TabHeadings = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`;

export const TabHeading = styled.span`
  cursor: pointer;
  flex-grow: 1;
  border-bottom: 2px solid ${borderColor};
  padding: 8px 0;
  ${(props) => (props.activeTab ? activeTabStyles : null)}
`;
