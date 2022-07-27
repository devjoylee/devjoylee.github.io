import React from "react"
import styled from "styled-components"

const SideBarWrapper = styled.div`
  margin-bottom: 40px;
  @media (min-width: 1300px) {
    position: sticky;
    align-self: flex-start;
    top: 70px;
    left: 0;
    max-width: 300px;
    margin-left: -150px;
    margin-right: 60px;
    & + div {
      margin-top: 15px;
    }
  }
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`

const SideBar = ({ children }) => {
  return <SideBarWrapper>{children}</SideBarWrapper>
}

export default SideBar
