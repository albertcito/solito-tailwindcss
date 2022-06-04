import gql from 'graphql-tag';

export default gql`
fragment BooksFragment on Book {
  slug
  title
  featuredImage {
    node {
      mediaItemUrl
    }
  }
  authorTags {
    nodes {
      name
    }
  }
}`;
