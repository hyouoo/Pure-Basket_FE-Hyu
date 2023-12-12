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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

  :root {

  /* fonts */
  --font-roboto: Roboto;
  --font-baloo-bhai: 'Baloo Bhai';
  --font-inter: Inter;

  /* font sizes */
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-mini: 15px;
  --font-size-xl: 20px;
  --font-size-11xl: 30px;
  --font-size-sm: 14px;
  --font-size-3xl: 22px;
  --font-size-23xl: 42px;
  --font-size-13xl: 32px;
  --font-size-xs: 12px;
  --font-size-5xl: 24px;
  --font-size-2xl: 21px;
  --font-size-smi: 13px;
  --font-size-42xl: 61px;
  --font-size-19xl: 38px;

  /* Colors */
  --studio-darkmode-allwhite-ffffff: #fff;
  --color-orange-100: #fba403;
  --color-orange-200: #f99a0e;
  --color-gray-100: #8e8e94;
  --color-gray-200: #191919;
  --color-gray-300: rgba(255, 255, 255, 0.2);
  --color-gray-400: rgba(0, 0, 0, 0.87);
  --action-hover: rgba(0, 0, 0, 0.04);
  --color-aliceblue: #f3f7fb;
  --color-whitesmoke-100: #f8f9fb;
  --color-whitesmoke-200: #eaeaea;
  --color-darkorange: #dc880b;
  --color-slategray: #576074;
  --color-darkslategray-100: #434343;
  --color-darkslategray-200: #424242;
  --color-darkslategray-300: #303030;
  --color-cornflowerblue-100: #1262af;
  --color-cornflowerblue-200: #1262ae;
  --color-cornflowerblue-300: rgba(18, 98, 175, 0.05);
  --color-royalblue: #457eff;
  --color-lightslategray: #7e8a97;
  --color-lightgray: #cecece;
  --color-dimgray-100: #646468;
  --color-dimgray-200: #57575d;
  --color-gainsboro: rgba(226, 226, 226, 0.1);
  --color-lavender-100: #ccdcec;
  --color-darkgray: #999;
  --color-black: #000;

  /* Gaps */
  --gap-25xl: 44px;
  --gap-sm: 14px;
  --gap-11xl: 30px;
  --gap-mid: 17px;
  --gap-3xs: 10px;
  --gap-6xs: 7px;
  --gap-xl: 20px;
  --gap-4xl: 23px;
  --gap-xs: 12px;
  --gap-base: 16px;
  --gap-12xl: 31px;
  --gap-7xs: 6px;
  --gap-5xs: 8px;
  --gap-17xl: 36px;
  --gap-5xl: 24px;
  --gap-9xs: 4px;
  --gap-11xs: 2px;
  --gap-31xl: 50px;
  --gap-2xs: 11px;
  --gap-8xs: 5px;
  --gap-10xs: 3px;
  --gap-2xl: 21px;

  /* Paddings */
  --padding-2xs: 11px;
  --padding-2xl: 21px;
  --padding-7xs: 6px;
  --padding-base: 16px;
  --padding-5xs: 8px;
  --padding-3xl: 22px;
  --padding-xl: 20px;
  --padding-3xs: 10px;
  --padding-14xl: 33px;
  --padding-65xl: 84px;
  --padding-21xl: 40px;
  --padding-5xl: 24px;
  --padding-11xl: 30px;
  --padding-9xl: 28px;
  --padding-31xl: 50px;
  --padding-61xl: 80px;
  --padding-mini: 15px;
  --padding-xs: 12px;
  --padding-6xl: 25px;
  --padding-8xs: 5px;
  --padding-smi: 13px;

  /* Border radiuses */
  --br-8xl: 27px;
  --br-7xs: 6px;
  --br-5xs: 8px;
  --br-xs: 12px;
  --br-9xs: 4px;
  --br-3xs: 10px;
  --br-19xl: 38px;
  --br-12xl: 31px;
  --br-base: 16px;
  }
`;

export default GlobalStyle;
