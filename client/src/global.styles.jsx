import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
    padding: 20px 60px;
  }
  
  a {
    text-decoration: none;
    color: black;
  }
  
  * {
    box-sizing: border-box;
  }
  
`;
