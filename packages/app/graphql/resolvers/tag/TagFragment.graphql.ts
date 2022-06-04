import gql from 'graphql-tag';

export default gql`
fragment TagFragment on Tag {
  databaseId
  name
  slug
}`;
