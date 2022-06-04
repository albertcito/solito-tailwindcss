import gql from 'graphql-tag';

export default gql`query audio(
  $id: ID!
  $idType: AudioIdType
) {
  audio(id: $id, idType: $idType) {
    ...AudioFragment
  }
}`;
