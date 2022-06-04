import gql from 'graphql-tag';

export default gql`mutation sendEmail(
  $input: SendEmailInput!
) {
    sendEmail(input: $input) {
      sent
      error
    }
}`;

