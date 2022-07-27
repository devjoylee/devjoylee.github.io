import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"

import Title from "components/Title"
import TagList from "components/TagList"

const PostListWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`

const PostWrapper = styled.div`
  position: relative;
  top: 0;
  margin-bottom: 15px;
  padding: 30px;
  border-radius: 5px;
  transition: all 0.5s;

  box-shadow: ${props => props.theme.colors.boxShadow};
  background: ${props => props.theme.colors.cardBackground};

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`

const Date = styled.p`
  margin-bottom: 16px;
  font-size: 14.4px;
  color: ${props => props.theme.colors.tertiaryText};
`

const Excerpt = styled.p`
  margin-bottom: 32px;
  line-height: 1.7;
  font-size: 16px;
  color: ${props => props.theme.colors.secondaryText};
  word-break: break-all;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const PostList = ({ postList }) => {
  const [postCount, setPostCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && postCount < postList.length) {
      setTimeout(() => setPostCount(postCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [postCount, postList])

  useEffect(() => {
    setPostCount(10)
  }, [postList])

  return (
    <PostListWrapper>
      {postList.slice(0, postCount).map((post, i) => {
        const { title, date, tags } = post.frontmatter
        const { excerpt } = post
        const { slug } = post.fields

        return (
          <PostWrapper key={i}>
            <Title size="bg">
              <Link to={slug}>{title}</Link>
            </Title>
            <Date>{date}</Date>
            <Excerpt>{excerpt}</Excerpt>
            <TagList tagList={tags} />
          </PostWrapper>
        )
      })}
    </PostListWrapper>
  )
}

export default PostList
