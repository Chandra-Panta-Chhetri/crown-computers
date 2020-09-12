import { createGlobalStyle } from "styled-components";

export const secondaryColor = "#3498db";
export const secondaryColorLight = "aliceblue";
export const mainColor = "#E8E8E8";
export const mainColorLight = "#4a4a4a";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
    padding: 20px 60px;
  }
  
  a {
    text-decoration: none;
    color: ${secondaryColor};
    font-weight: 700;
  }
  
  * {
    box-sizing: border-box;
    letter-spacing: 1.1px;
  }
`;
