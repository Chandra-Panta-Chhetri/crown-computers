import styled from "styled-components";
import {
  secondaryColor,
  shrinkLabelMixin,
  mainColor
} from "../form-input/form-input.styles";

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0 35px;
`;

export const InputLabel = styled.label`
  position: absolute;
  ${shrinkLabelMixin}
`;

export const FormField = styled.input`
  color: ${mainColor};
  font-size: 18px;
  padding: 10px 10px 10px 7px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 6px;
  border: 1px solid ${secondaryColor};
  background: ${(props) => (props.readOnly ? "#dddddd" : "unset")};
  text-transform: ${(props) => (props.uppercaseInput ? "uppercase" : "none")};

  &:focus {
    outline: none;
  }
`;
