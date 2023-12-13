import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Poor Story', 'Dokdo';
    background-color: ${(props) => props.theme.color.bgColor};
    color: ${(props) => props.theme.color.textColor};
    width: 100vw;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

`;

export default GlobalStyle;
