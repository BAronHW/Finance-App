import { gql } from "@apollo/client";
import { GET_BALANCE } from './Users';

export const CREATE_LINKTOKEN = gql(`
  mutation CreateLinkToken {
    createLinkToken {
      link_token
      expiration
      request_id
    }
  }
`);

export const EXCHANGE_PUB_TOKEN = gql(`
  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {
    exchangePublicToken(userId: $userId, public_token: $public_token)
  }
`);
