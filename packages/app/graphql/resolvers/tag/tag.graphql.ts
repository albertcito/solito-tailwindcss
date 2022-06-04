import gql from 'graphql-tag';

export default gql`query tag($id: ID!, $idType: TagIdType) {
  tag(id: $id, idType: $idType) {
    ...TagFragment
  }
}`;
