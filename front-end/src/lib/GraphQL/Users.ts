import { gql } from "@/__generated__/gql";

export const GET_ALL_USERS = gql(`
  query Users {
    users {
      firstName
      lastName
      username
      password
      phone
      email
      uid
      id
      transactions {
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
  }
`);

export const DELETE_USER = gql(`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      username
      password
      phone
      email
      uid
      transactions {
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
  }
`);

export const GET_SINGLE_USER_BY_UID = gql(`
  query User($uid: String!) {
    user (uid: $uid) {
      id
      firstName
      lastName
      username
      password
      phone
      email
      uid
      transactions {
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
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $username: String!
    $password: String
    $email: String!
    $uid: String!
    $phone: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
      email: $email
      uid: $uid
      phone: $phone
    ) {
      id
      firstName
      lastName
      username
      password
      email
      uid
      phone
    }
  }
`);
