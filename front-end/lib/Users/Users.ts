import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      first_name
      last_name
      uuid
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $first_name: String, $last_name: String) {
    updateUser(id: $id, first_name: $first_name, last_name: $last_name) {
      id
      first_name
      last_name
      uuid
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      first_name
      last_name
      uuid
    }
  }
`;

export const GET_SINGLE_USER_BY_ID = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      uuid
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($first_name: String!, $last_name: String!) {
    createUser(first_name: $first_name, last_name: $last_name) {
      id
      first_name
      last_name
      uuid
    }
  }
`;