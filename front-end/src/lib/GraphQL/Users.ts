import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
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
    }
  }
`;

export const DELETE_USER = gql`
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
    }
  }
`;

export const GET_SINGLE_USER_BY_UID = gql`
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
    }
  }
`;

export const CREATE_USER = gql`
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
`;
