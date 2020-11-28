import styled from "styled-components";
import { loadingDotsAnimationStyles } from "../spinner/spinner.styles";

export const LoadingText = styled.p`
  margin: 0;
  ${loadingDotsAnimationStyles}
`;

export const CardElementContainer = styled.div`
  margin-bottom: 25px;

  & .StripeElement {
    width: 100%;
    padding: 15px;
    border-radius: 6px;
    border: ${(props) =>
      props.isDarkMode ? "none" : `2px solid ${props.theme.textColor}`};
    background: ${(props) => props.theme.backgroundColor};
  }
`;
