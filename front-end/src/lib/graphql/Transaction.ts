import gql from 'graphql-tag';

export const GET_TRANSACTIONS_BY_USER_ID = gql(`
    query GetTransactionsByUserId($userId: Int!) {
      getTransactionsByUserId(userId: $userId) {
        id
        userId
        accountId
        Account {
          name
        }
        io
        name
        merchantName
        amount
        category
        date
      }
    }
  `)

export const UPSERT_TRANSACTIONS_FROM_PLAID = gql(`
  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {
    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {
      id
      userId
      merchantName
      amount
      date
      plaidId
    }}
  `);
