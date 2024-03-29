import React from "react"
import styled from "styled-components"

import { title } from "../../../../blog-config"

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding: 40px 0;
  border-top: 1px solid ${props => props.theme.colors.divider};
  text-align: center;
  font-size: 11pt;
  font-weight: lighter;
  color: ${props => props.theme.colors.secondaryText};
  background: ${props => props.theme.colors.cardBackground};

  & > a {
    color: ${props => props.theme.colors.text};
  }
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      © {title}, Built with Gatsby and{" "}
      <a href="https://github.com/devHudi/gatsby-starter-hoodie" target="blank">
        gatsby-starter-hoodie
      </a>{" "}
      theme.
    </FooterWrapper>
  )
}

export default Footer
