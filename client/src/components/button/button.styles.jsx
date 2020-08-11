import styled from "styled-components";

export const ButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  color: black;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: 2px solid white;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  flex-grow: 1;

  &:hover {
    background-color: black;
    color: white;
  }
`;