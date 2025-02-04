import gql from 'graphql-tag';

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
      Transactions {
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
  }
`);

export const FETCH_ACCESS_TOKEN_FROM_USER = gql(`
  query FetchAccessTokenFromUser($userId: Int!) {
    fetchAccessTokenFromUser(userId: $userId) 
  }
  `) 

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
      Transactions {
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
      Transactions {
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

export const GET_BALANCE = gql`
  mutation Get_balance($access_token: String!) {
    get_balance(access_token: $access_token)
  }
`

export const FETCH_ACCESS_TOKEN_FROM_USER = gql`
query FetchAccessTokenFromUser($userId: Int!) {
    fetchAccessTokenFromUser(userId: $userId) {
        accessToken
        item_id
        request_id
    }
}
`

export const FETCH_UID_FROM_USER = gql`
query Getuseruidfromuserid($userId: Int!) {
    getuseruidfromuserid(userId: $userId) {
        uid
    }
}
`