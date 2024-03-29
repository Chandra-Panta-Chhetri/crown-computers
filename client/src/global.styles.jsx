import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
    padding: 20px 60px;
    background-color: ${(props) => props.theme.backgroundColor};
    transition: background-color 0.5s;
    color: ${(props) => props.theme.textColor};

    @media only screen and (max-width: 600px) {
      padding: 20px;
    }
  }
  
  a {
    text-decoration: none;
    color: ${(props) => props.theme.secondary};
    font-weight: 700;
  }
  
  * {
    box-sizing: border-box;
    letter-spacing: 1.1px;
  }
`;
