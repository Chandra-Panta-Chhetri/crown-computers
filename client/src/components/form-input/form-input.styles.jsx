import styled, { css } from "styled-components";

export const FormFieldStyles = css`
  color: ${(props) => props.theme.primaryFormColor};
  font-size: 18px;
  padding: 10px 10px 10px 7px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 6px;
  border: ${(props) =>
    props.isDarkMode ? "none" : `2px solid ${props.theme.textColor}`};
  background-color: ${(props) =>
    props.readOnly
      ? props.theme.readOnlyBackgroundColor
      : props.theme.backgroundColor};
  text-transform: ${(props) => (props.uppercaseInput ? "uppercase" : "none")};
  cursor: ${(props) => (props.readOnly ? "not-allowed" : "default")};

  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    border: ${(props) =>
      props.isDarkMode ? "none" : `2px solid ${props.theme.textColor}`};
    -webkit-text-fill-color: ${(props) => props.theme.textColor};
    -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.backgroundColor}
      inset;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: ${(props) => props.theme.textColor};
  }
`;

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0 35px;
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: 12px;
  color: ${(props) => props.theme.primaryFormColor};
  left: 0;
  position: absolute;
`;

export const FormField = styled.input`
  ${FormFieldStyles}
`;

export const Textarea = styled.textarea`
  color: ${(props) => props.theme.primaryFormColor};
  font-size: 18px;
  padding: 10px 10px 10px 7px;
  display: block;
  width: 100%;
  border: none;
  resize: vertical;
  min-height: 160px;
  border-radius: 6px;
  border: ${(props) =>
    props.isDarkMode
      ? "none"
      : `2px solid ${(props) => props.theme.textColor}`};
  background: ${(props) =>
    props.readOnly ? props.theme.readOnlyBackgroundColor : "unset"};
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;
