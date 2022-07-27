import React from "react"
import _ from "lodash"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "components/Layout"
import SEO from "components/SEO"
import Bio from "components/Bio"
import PostList from "components/PostList"
import TagList from "components/TagList"
import SideBar from "components/SideBar"
import VerticalSpace from "components/VerticalSpace"

import { title, description, siteUrl } from "../../blog-config"

const MainWrapper = styled.div`
  @media (min-width: 1300px) {
    display: flex;
    margin-right: -125px;
  }
`

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const tags = _.sortBy(data.allMarkdownRemark.group, ["totalCount"]).reverse()

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to &quot;content/blog&quot; (or
        the directory you specified for the &quot;gatsby-source-filesystem&quot;
        plugin in gatsby-config.js).
      </p>
    )
  }

  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      <VerticalSpace size={48} />
      <MainWrapper>
        <SideBar>
          <Bio card />
          <TagList tagList={tags} postCount={posts.length} count />
        </SideBar>
        <PostList postList={posts} />
      </MainWrapper>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          update(formatString: "MMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
