import gql from 'graphql-tag';

export default gql`query post(
  $asPreview: Boolean
  $id: ID!
  $idType: PostIdType
) {
  post(
    asPreview: $asPreview
    id: $id
    idType: $idType
  ) {
    ...PostListFragment
    content
  }
}`;
