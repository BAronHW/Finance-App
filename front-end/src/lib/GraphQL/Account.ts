import { gql } from "@apollo/client";

export const GET_ACCOUNTS_BY_USER_ID = gql(`
  query GetAccountsByUserId($userId: Int!) {
    getAccountsByUserId(userId: $userId) {
      id
      mask
      name
      officialName
      subtype
      type
      Transactions {
        userId
        merchantName
        amount
      }
      plaidId
      available
      current
      isoCurrencyCode
      unofficialCurrencyCode
      limit
    }
  }
  `)


export const UPSERT_ACCOUNTS_FROM_PLAID = gql(`
  mutation UpsertAccountsFromPlaid($userId: Int!, $accessToken: String!) {
    upsertAccountsFromPlaid(userId: $userId, accessToken: $accessToken) {
      id
      name
      plaidId
    }
  }
  `)