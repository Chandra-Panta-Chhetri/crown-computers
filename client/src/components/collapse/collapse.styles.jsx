import styled from "styled-components";

export const CollapseContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CollapseTitle = styled.span`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  transition: background-color 0.6s ease;
  padding: 0 15px;
  text-transform: capitalize;
  font-weight: bold;

  &:hover {
    background-color: #ccc;
  }
`;

export const CollapseIcon = styled.i`
  margin-left: auto;
`;

export const CollapseContent = styled.div`
  background-color: #eee;
  overflow: hidden;
  transition: max-height 1s ease;
  padding: ${(props) => (props.isOpen ? "18px 15px" : "0px")};
  max-height: ${(props) => (props.isOpen ? "unset" : "0px")};
`;
