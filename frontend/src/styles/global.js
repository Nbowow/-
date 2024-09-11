import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import SUITBold from "../fonts/SUIT-Bold.ttf";
import SUITExtraBold from "../fonts/SUIT-ExtraBold.ttf";
import SUITExtraLight from "../fonts/SUIT-ExtraLight.ttf";
import SUITHeavy from "../fonts/SUIT-Heavy.ttf";
import SUITLight from "../fonts/SUIT-Light.ttf";
import SUITMedium from "../fonts/SUIT-Medium.ttf";
import SUITRegular from "../fonts/SUIT-Regular.ttf";
import SUITSemiBold from "../fonts/SUIT-SemiBold.ttf";
import SUITThin from "../fonts/SUIT-Thin.ttf";
const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
        font-family: 'SuitBold';
        src: local('SuitBold'), local('SuitBold');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITBold}) format('truetype');
  }
  @font-face {
        font-family: 'SuitExtraBold';
        src: local('SuitExtraBold'), local('SuitExtraBold');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITExtraBold}) format('truetype');
  }        
  @font-face {
        font-family: 'SuitExtraLight';
        src: local('SuitExtraLight'), local('SuitExtraLight');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITExtraLight}) format('truetype');
  }
  @font-face {
        font-family: 'SUITHeavy';
        src: local('SUITHeavy'), local('SUITHeavy');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITHeavy}) format('truetype');
  }
  @font-face {
        font-family: 'SUITLight';
        src: local('SUITLight'), local('SUITLight');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITLight}) format('truetype');
  }
  @font-face {
        font-family: 'SUITMedium';
        src: local('SUITMedium'), local('SUITMedium');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITMedium}) format('truetype');
  }
  @font-face {
        font-family: 'SUITRegular';
        src: local('SUITRegular'), local('SUITRegular');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITRegular}) format('truetype');
  }
  @font-face {
        font-family: 'SUITSemiBold';
        src: local('SUITSemiBold'), local('SUITSemiBold');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITSemiBold}) format('truetype');
  }
  @font-face {
        font-family: 'Suit';
        src: local('SUITThin'), local('SUITThin');
        font-style: normal;
        font-weight: normal;
        src: url(${SUITThin}) format('truetype');
  }
  body{
    font-family: 'SuitRegular';
  }
}
`;

export default GlobalStyle;
