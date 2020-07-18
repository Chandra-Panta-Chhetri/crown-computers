import styled from "styled-components";

import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";

export const SignUpContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 4px solid #efefef;
  align-items: center;
  border-radius: 8px;
  width: 40%;
`;

export const Form = styled.form`
  width: 85%;
`;

export const FormTitle = styled.h1`
  margin-bottom: 0;
`;

export const ErrorText = styled.h5`
  color: red;
`;

export const FormButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
`;

export const FormRedirectLink = styled(Link)`
  color: blue;
`;
