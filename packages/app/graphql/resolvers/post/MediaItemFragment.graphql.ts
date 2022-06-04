import gql from 'graphql-tag';

export default gql`
fragment MediaItemFragment on MediaItem {
  databaseId
  mediaItemUrl
  sizes
  srcSet
  caption
  image_attr {
    ccUrl
  }
}`;
