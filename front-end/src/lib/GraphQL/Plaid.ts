import { gql } from "@apollo/client";

export const CREATE_LINKTOKEN = gql`
  mutation CreateLinkToken {
    createLinkToken {
      link_token
      expiration
      request_id
    }
  }
`;