import gql from 'graphql-tag';

export default gql`
fragment PostListFragment on Post {
  databaseId
  slug
  title
  excerpt
  authorDatabaseId
  date
  slug
  featuredImage {
    node {
      ...MediaItemFragment
    }
  }
  author {
    node {
      ...UserFragment
    }
  }
  categories {
    nodes {
      ...CategoryFragment
    }
  }
  tags {
    nodes {
      ...TagFragment
    }
  }
  alerts {
    ...PostAlertsFragment
  }
}`;
