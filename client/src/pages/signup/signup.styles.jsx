import styled from "styled-components";
import Button from "../../components/button/button.component";
import Card from "../../components/card/card.component";

export const SignUpContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  background-color: ${(props) => props.theme.backgroundColorLight};

  @media only screen and (max-width: 850px) {
    width: 80%;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 85%;
`;

export const FormTitle = styled.h1`
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 2.5px;
`;

export const FormButton = styled(Button)`
  width: 100%;
  margin-bottom: 15px;
`;
