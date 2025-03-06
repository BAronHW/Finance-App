import { gql } from "@apollo/client"

export const GET_CATEGORIES_BY_USER_ID_FOR_TABLE = gql(`
  query GetCategoriesByUserIdForTable($userId: Int!) {
    getCategoriesByUserId(userId: $userId) {
      id
      name
      colour
    }
  }
`);

export const GET_CATEGORIES_BY_USER_ID = gql(`
  query GetCategoriesByUserId($userId: Int!) {
    getCategoriesByUserId(userId: $userId) {
      id
      name
      description
      userId
      colour
      User {
        username
        firstName
        lastName
        email
        uid
      }
      Transactions {
        id
        date
        amount
        merchantName
      }
    }
  }
`);

export const GET_CATEGORY_BY_ID = gql(`
  query GetCategoryById($id: Int!) {
    getCategoryById(id: $id) {
      name
      colour
    }
  }
  `)

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($name: String!, $userId: Int!, $description: String) {
    createCategory(name: $name, userId: $userId, description: $description) {
      id
      name
      description
      userId
      colour
      User {
        username
        firstName
        lastName
        email
        uid
      }
    }
  }
`);

export const DELETE_CATEGORY = gql(`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
      name
      description
      userId
      User {
        username
        firstName
        lastName
        email
        uid
      }
    }
  }
  `);

export const UPDATE_CATEGORY = gql(`
  mutation UpdateCategory($id: Int!, $name: String, $description: String, $colour: String) {
    updateCategory(id: $id, name: $name, description: $description, colour: $colour) {
      id
      name
      description
      userId
      colour
      User {
        username
        firstName
        lastName
        email
        uid
      }
    }
  }
  `);