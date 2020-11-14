import styled from "styled-components";
import { mainColor, secondaryColor } from "../form-input/form-input.styles";

export const FormSelectContainer = styled.div`
  position: relative;
  margin: 25px 0 35px;
`;

export const SelectFormInput = styled.select`
  color: ${mainColor};
  font-size: 18px;
  padding: 10px 10px 10px 7px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 6px;
  border: 1px solid ${secondaryColor};
  background: ${(props) => (props.readOnly ? "#dddddd" : "unset")};
  text-transform: capitalize;

  &:focus {
    outline: none;
  }
`;
