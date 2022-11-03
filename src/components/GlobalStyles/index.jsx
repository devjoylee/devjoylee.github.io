import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    background: ${props => props.theme.colors.bodyBackground};
  }

  html, 
  body, 
  #___gatsby,
  #gatsby-focus-wrapper{
    height: 100%;
  }
  #gatsby-focus-wrapper{
    display:flex;
    flex-direction: column;
  }

`

export default GlobalStyles
