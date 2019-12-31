import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'


class MealRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article>
                <header>
                  <p className="post-meta">
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.title}
                    </span>
                  </p>
                  <p>{post.frontmatter.weekofmeals[0].day}</p>
                  <p>{post.frontmatter.weekofmeals[0].meal}</p>
                </header>
                <div>
                <p>{post.frontmatter.weekofmeals[1].day}</p>
                <p>{post.frontmatter.weekofmeals[1].meal}</p>
                </div>
              </article>
            </div>
          ))}
      </div>
    )
  }
}
MealRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query MealRollQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "meals-page" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                templateKey
                weekofmeals {
                  day
                  meal
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Layout><section className="section">
    <div className="container">
      <div className="content">
      <MealRoll data={data} count={count} />
      </div>
    </div>
  </section></Layout>}
  />
)
