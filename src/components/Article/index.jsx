import styled from "styled-components"

import Header from "./Header"
import Series from "./Series"
import Body from "./Body"
import Footer from "./Footer"

const Article = styled.article`
  padding: 5px 22px;
  box-shadow: ${props => props.theme.colors.boxShadow};
  background: ${props => props.theme.colors.cardBackground};
`

Article.Header = Header
Article.Series = Series
Article.Body = Body
Article.Footer = Footer

export default Article
