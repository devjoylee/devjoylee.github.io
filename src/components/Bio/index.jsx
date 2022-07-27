import React from "react"
import styled from "styled-components"

import {
  FaGithub,
  FaKaggle,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaLink,
  FaEnvelope,
} from "react-icons/fa"

import { siteUrl, description, author, links } from "../../../blog-config"

const BioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  &.card {
    @media (min-width: 1300px) {
      display: block;
      width: 200px;
      padding: 40px;
      border-radius: 5px;
      box-shadow: ${props => props.theme.colors.boxShadow};
      background: ${props => props.theme.colors.cardBackground};
    }
  }
`

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : siteUrl

const Profile = styled.div`
  flex: 0 0 auto;
  margin-right: 16px;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  background-image: url(${profileImageRoot}/profile.png);
  background-size: cover;
  background-position: center;

  @media (min-width: 1300px) {
    margin: ${props => props.card && "0 auto 20px"};
  }
`

const UserInfo = styled.div`
  @media (min-width: 1300px) {
    text-align: ${props => props.card && "center"};
  }
`

const Author = styled.div`
  margin-bottom: 7px;
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
`

const Description = styled.div`
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
`

const LinksWrapper = styled.div`
  & a {
    margin-right: 9.6px;
  }

  & svg {
    width: 25.6px;
    height: 25.6px;
    cursor: pointer;
  }

  & svg path {
    fill: ${props => props.theme.colors.icon};
    transition: fill 0.3s;
  }

  & a:hover svg path {
    fill: ${props => props.theme.colors.text};
  }
`

const Link = ({ link, children }) => {
  if (!link) return null
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const Bio = ({ card }) => {
  const { github, kaggle, instagram, facebook, linkedIn, email, etc } = links

  return (
    <BioWrapper id="bio" className={`${card && "card"}`}>
      <Profile card={card} />
      <UserInfo card={card}>
        <Author>{author}</Author>
        <Description>{description}</Description>
        <LinksWrapper>
          <Link link={github}>
            <FaGithub />
          </Link>
          <Link link={kaggle}>
            <FaKaggle />
          </Link>
          <Link link={instagram}>
            <FaInstagram />
          </Link>
          <Link link={facebook}>
            <FaFacebook />
          </Link>
          <Link link={linkedIn}>
            <FaLinkedin />
          </Link>
          <Link link={email}>
            <FaEnvelope />
          </Link>
          <Link link={etc}>
            <FaLink />
          </Link>
        </LinksWrapper>
      </UserInfo>
    </BioWrapper>
  )
}

export default Bio
