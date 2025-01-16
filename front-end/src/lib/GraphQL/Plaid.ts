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

export const EXCHANGE_PUB_TOKEN = gql`
  mutation ExchangePublicToken($userId: String!, $public_token: String!) {
    exchangePublicToken(userId: $userId, public_token: $public_token) {
        accessToken
        item_id
        request_id
    }
  }
`;