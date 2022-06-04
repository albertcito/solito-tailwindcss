import gql from 'graphql-tag';

export default gql`query books($where: RootQueryToBookConnectionWhereArgs) {
  books(where: $where) {
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      ...BooksFragment
    }
  }
}`;
