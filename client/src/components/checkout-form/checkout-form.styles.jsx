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

export const FormButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const BackButton = styled(Button)`
  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

export const ContinueButton = styled(Button)`
  margin-left: auto;

  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
`;
