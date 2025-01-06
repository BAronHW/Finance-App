import { gql } from "@//__generated__/gql";

export const GET_TRANSACTIONS_BY_USER_ID = gql(`
    query GetTransactionsByUserId($userId: Int!) {
      getTransactionsByUserId(userId: $userId) {
        id
        userId
        accountName
        io
        name
        senderOrRecipientName
        amount
        reference
        category
        date
      }
    }
  `) 