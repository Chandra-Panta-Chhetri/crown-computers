import styled, { css } from "styled-components";

export const secondaryColor = "grey";
export const mainColor = "black";

export const FormFieldStyles = css`
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

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0 35px;
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: 12px;
  color: ${mainColor};
  left: 0;
  position: absolute;
`;

export const FormField = styled.input`
  ${FormFieldStyles}
`;

export const Textarea = styled.textarea`
  color: ${mainColor};
  font-size: 18px;
  padding: 10px 10px 10px 7px;
  display: block;
  width: 100%;
  border: none;
  resize: vertical;
  min-height: 160px;
  border-radius: 6px;
  border: 1px solid ${secondaryColor};
  background: ${(props) => (props.readOnly ? "#dddddd" : "unset")};
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;
