import gql from 'graphql-tag';

export default gql`query book(
  $asPreview: Boolean
  $id: ID!
  $idType: BookIdType
) {
  book(
    asPreview: $asPreview
    id: $id
    idType: $idType
  ) {
    ...BooksFragment
    content
    excerpt
    links {
      pdf
      epub
    }
  }
}`;
