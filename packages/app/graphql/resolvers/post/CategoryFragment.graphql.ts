import gql from 'graphql-tag';

export default gql`
fragment CategoryFragment on Category {
  databaseId
  name
  parentDatabaseId
}`;
