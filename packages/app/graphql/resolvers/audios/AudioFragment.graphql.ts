import gql from 'graphql-tag';

export default gql`
fragment AudioFragment on Audio {
  slug
  title
  date
  featuredImage {
    node {
      mediaItemUrl
    }
  }
  audios {
    mp3 {
      slug
      mediaItemUrl
    }
  }
}`;
