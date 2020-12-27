import { createGlobalStyle } from "styled-components";
import brandon from "../assets/brandonMedium.ttf";

export const Global = createGlobalStyle`
  @font-face {
    font-family: 'Brandon';
    src: url(${brandon}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  * {
    margin: 0;
    padding: 0;
    font-size: 13px;
    box-sizing: border-box;
    body {
      height: 100vh;
    }
  }
  #root {
    height: 100vh;
  }
`;

export default Global;
