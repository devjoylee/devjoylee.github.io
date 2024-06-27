import React from "react"
import styled from "styled-components"

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding: 80px 0;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;

  @media (max-width: 1050px) {
    padding: 55px 15px;
  }
`

const Body = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default Body
