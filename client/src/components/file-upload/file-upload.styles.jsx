import styled from "styled-components";
import { shrinkLabelMixin } from "../form-input/form-input.styles";
import Button from "../button/button.component";

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0 35px;
  border: 2px dotted lightgray;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLabel = styled.label`
  position: absolute;
  ${shrinkLabelMixin}
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
`;

export const UploadFileBtn = styled(Button)`
  width: 45%;
`;
