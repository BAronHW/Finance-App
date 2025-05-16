import gql from "graphql-tag";

export const GET_ALL_USERS = gql(`
  query GetAllUsers {
    getAllUsers {
      firstName
      lastName
      username
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
        date
      }
    }
  }
`);

export const GET_USER_BY_ID = gql(`
  query GetUserbyId($userId: Int!) {
    getUserById(userId: $userId) {
      accessToken
      firstName
      lastName
      username
      phone
      email
      profilePictureUrl
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
        date
      }
    }
  }
`);

export const GET_SINGLE_USER_BY_UID = gql(`
  query GetSingleUserByUid($uid: String!) {
    getUserByUid (uid: $uid) {
      id
      firstName
      lastName
      username
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
        date
      }
    }
  }
`);

export const GET_SINGLE_USERID_BY_UID = gql(`
  query GetUserIdByUid($uid: String!) {
    getUserByUid (uid: $uid) {
      id
    }
  }
`);

export const CREATE_USER = gql(`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $username: String!
    $email: String!
    $uid: String!
    $phone: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      uid: $uid
      phone: $phone
    ) {
      id
      firstName
      lastName
      username
      email
      uid
      phone
    }
  }
`);

export const FETCH_UID_FROM_USER = gql`
  query GetUserUidFromUserId($userId: Int!) {
    getUserById(userId: $userId) {
      uid
    }
  }
`;

export const USERNAME_EXISTS = gql`
  query UsernameExists($username: String!) {
    usernameExists(username: $username)
  }
`;

export const GET_USER_PFP = gql`
  query getUserById($userId: Int!) {
    getUserById(userId: $userId) {
      id
      profilePictureUrl
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails(
    $id: Int!
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $phone: String
  ) {
    updateUserDetails(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      phone: $phone
    ) {
      id
      firstName
      lastName
      username
      email
      phone
    }
  }
`;
