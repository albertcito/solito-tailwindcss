import gql from 'graphql-tag';

export default gql`query posts($where: RootQueryToPostConnectionWhereArgs) {
  posts(where: $where) {
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      ...PostListFragment
    }
  }
}`;
