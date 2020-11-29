import styled from "styled-components";

export const CollapseContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CollapseTitle = styled.span`
  background-color: ${(props) => props.theme.backgroundColorLighter};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  padding: 0 15px;
  text-transform: capitalize;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.backgroundColorLighter};
  }
`;

export const CollapseIcon = styled.i`
  margin-left: auto;
`;

export const CollapseContent = styled.div`
  background-color: ${(props) => props.theme.backgroundColorLighter};
  overflow-y: auto;
  padding: ${(props) => (props.isOpen ? "18px 15px" : "0px")};
  transition: max-height 1s cubic-bezier(0, 1, 0, 1);
`;
