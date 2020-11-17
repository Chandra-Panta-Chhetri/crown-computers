import styled from "styled-components";
import Button from "../button/button.component";

export const FormContainer = styled.form`
  width: 100%;
`;

export const FormTitle = styled.h4`
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 30px;
`;

export const ContinueButton = styled(Button)`
  float: right;
`;
