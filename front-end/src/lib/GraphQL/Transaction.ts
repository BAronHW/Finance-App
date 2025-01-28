import gql from 'graphql-tag';

export const GET_TRANSACTIONS_BY_USER_ID = gql(`
    query GetTransactionsByUserId($userId: Int!) {
      getTransactionsByUserId(userId: $userId) {
        id
        userId
        accountId
        io
        name
        merchantName
        amount
        category
        date
      }
    }
  `) 

export const UPSERT_TRANSACTIONS = gql(`
  mutation UpsertTransactions($userId: Int!, $accountId: Int, $access_token: String!, $start_date: String!, $end_date: String!) {
    upsertTransactions(userId: $userId, access_token: $access_token, start_date: $start_date, end_date: $end_date) {
      id
      userId
      merchantName
      amount
      date
      plaidId
    }}
  `);
