import styled, { css } from "styled-components";

const subColor = "grey";
const mainColor = "black";

const shrinkLabelMixin = css`
  top: -18px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0;
`;

export const InputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelMixin}
  }
`;

export const FormField = styled.input`
  color: ${mainColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 6px;
  border: 1px solid ${subColor};
  background: ${(props) => (props.readOnly ? "#dddddd" : "unset")};

  &:focus {
    outline: none;
  }

  &:focus ~ ${InputLabel} {
    ${shrinkLabelMixin}
  }
`;
