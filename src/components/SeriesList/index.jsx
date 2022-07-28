import React, { useState, useEffect } from "react"
import styled from "styled-components"
import _ from "lodash"

import { Link } from "gatsby"
import Title from "components/Title"

const SeriesListWrapper = styled.div`
  margin: 40px -5px 0;
  display: flex;
  flex-wrap: wrap;
`

const SeriesColumn = styled.div`
  flex-basis: 33.33%;
  @media (max-width: 1024px) {
    flex-basis: 50%;
  }
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`

const SeriesCard = styled.div`
  margin: 0 5px 10px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.colors.boxShadow};
  background: ${props => props.theme.colors.cardBackground};
`

const SeriesInform = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.tertiaryText};

  & > span {
    margin: 0 5px;
  }
`

const Date = styled.p`
  font-size: 14.4px;
`

const PostCount = styled.p`
  font-size: 14.4px;
`

const checkIsScrollAtBottom = () => {
  return (
    document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
    document.documentElement.clientHeight + 100
  )
}

const SeriesList = ({ seriesList }) => {
  const [seriesCount, setSeriesCount] = useState(10)

  const handleMoreLoad = _.throttle(() => {
    if (checkIsScrollAtBottom() && seriesCount < seriesList.length) {
      setTimeout(() => setSeriesCount(seriesCount + 10), 300)
    }
  }, 250)

  useEffect(() => {
    window.addEventListener("scroll", handleMoreLoad)

    return () => {
      window.removeEventListener("scroll", handleMoreLoad)
    }
  }, [seriesCount, seriesList])

  useEffect(() => {
    setSeriesCount(10)
  }, [seriesList])

  return (
    <SeriesListWrapper>
      {seriesList.slice(0, seriesCount).map((series, i) => {
        return (
          <SeriesColumn key={i}>
            <SeriesCard>
              <Title size="md">
                <Link to={`/series/${_.replace(series.name, /\s/g, "-")}`}>
                  {series.name}
                </Link>
              </Title>
              <SeriesInform>
                <PostCount>{series.posts.length} Posts</PostCount>
                <span>·</span>
                <Date>Last updated on {series.lastUpdated}</Date>
              </SeriesInform>
            </SeriesCard>
          </SeriesColumn>
        )
      })}
    </SeriesListWrapper>
  )
}

export default SeriesList
