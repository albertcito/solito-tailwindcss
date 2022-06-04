import gql from 'graphql-tag';

export default gql`query audios($where: RootQueryToAudioConnectionWhereArgs) {
  audios(where: $where) {
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      ...AudioFragment
    }
  }
}`;
