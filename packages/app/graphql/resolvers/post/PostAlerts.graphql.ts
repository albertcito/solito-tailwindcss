import gql from 'graphql-tag';

export default gql`
fragment PostAlertsFragment on Post_Alerts {
  info {
    content
    type
  }
}`;
