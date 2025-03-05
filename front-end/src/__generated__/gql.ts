/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetAccountsByUserId($userId: Int!) {\n    getAccountsByUserId(userId: $userId) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  ": types.GetAccountsByUserIdDocument,
    "\n  mutation UpsertAccountsFromPlaid($userId: Int!, $accessToken: String!) {\n    upsertAccountsFromPlaid(userId: $userId, accessToken: $accessToken) {\n      id\n      name\n      plaidId\n    }\n  }\n  ": types.UpsertAccountsFromPlaidDocument,
    "\n  mutation DeleteAccount($id: Int!) {\n    deleteAccount(id: $id) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  ": types.DeleteAccountDocument,
    "\n  query GetCategoriesByUserIdForCategoryColumn($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      colour\n    }\n  }\n": types.GetCategoriesByUserIdForCategoryColumnDocument,
    "\n  query GetCategoriesByUserId($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n      Transactions {\n        id\n        date\n        amount\n        merchantName\n      }\n    }\n  }\n": types.GetCategoriesByUserIdDocument,
    "\n  query GetCategoryById($id: Int!) {\n    getCategoryById(id: $id) {\n      name\n      colour\n    }\n  }\n  ": types.GetCategoryByIdDocument,
    "\n  mutation CreateCategory($name: String!, $userId: Int!, $description: String) {\n    createCategory(name: $name, userId: $userId, description: $description) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation DeleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      id\n      name\n      description\n      userId\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  ": types.DeleteCategoryDocument,
    "\n  mutation UpdateCategory($id: Int!, $name: String, $description: String, $colour: String) {\n    updateCategory(id: $id, name: $name, description: $description, colour: $colour) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  ": types.UpdateCategoryDocument,
    "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n": types.CreateLinkTokenDocument,
    "\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n": types.ExchangePublicTokenDocument,
    "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        Account {\n          name\n        }\n        io\n        name\n        merchantName\n        amount\n        categoryId\n        Category {\n          id\n          name\n          colour\n        }\n        date\n      }\n    }\n  ": types.GetTransactionsByUserIdDocument,
    "\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  ": types.UpsertTransactionsFromPlaidDocument,
    "\n  mutation UpdateTransaction($id: Int!, $name: String, $merchantName: String, $categoryId: Int) {\n    updateTransaction(id: $id, name: $name, merchantName: $merchantName, categoryId: $categoryId) {\n      id\n      name\n      merchantName\n      Category {\n        id\n        name\n        colour\n      }\n    }\n  }\n  ": types.UpdateTransactionDocument,
    "\n  query GetAllUsers {\n    getAllUsers {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query GetUserbyId($userId: Int!) {\n    getUserById(userId: $userId) {\n      accessToken\n    }\n  }\n  ": types.GetUserbyIdDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query User($uid: String!) {\n    getUserByUid (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n": types.UserDocument,
    "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n": types.CreateUserDocument,
    "\nquery GetUserUidFromUserId($userId: Int!) {\n    getUserById(userId: $userId) {\n        uid\n    }\n}\n": types.GetUserUidFromUserIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAccountsByUserId($userId: Int!) {\n    getAccountsByUserId(userId: $userId) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  "): (typeof documents)["\n  query GetAccountsByUserId($userId: Int!) {\n    getAccountsByUserId(userId: $userId) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertAccountsFromPlaid($userId: Int!, $accessToken: String!) {\n    upsertAccountsFromPlaid(userId: $userId, accessToken: $accessToken) {\n      id\n      name\n      plaidId\n    }\n  }\n  "): (typeof documents)["\n  mutation UpsertAccountsFromPlaid($userId: Int!, $accessToken: String!) {\n    upsertAccountsFromPlaid(userId: $userId, accessToken: $accessToken) {\n      id\n      name\n      plaidId\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAccount($id: Int!) {\n    deleteAccount(id: $id) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  "): (typeof documents)["\n  mutation DeleteAccount($id: Int!) {\n    deleteAccount(id: $id) {\n      id\n      mask\n      name\n      officialName\n      subtype\n      type\n      Transactions {\n        userId\n        merchantName\n        amount\n      }\n      plaidId\n      available\n      current\n      isoCurrencyCode\n      unofficialCurrencyCode\n      limit\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategoriesByUserIdForCategoryColumn($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      colour\n    }\n  }\n"): (typeof documents)["\n  query GetCategoriesByUserIdForCategoryColumn($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      colour\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategoriesByUserId($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n      Transactions {\n        id\n        date\n        amount\n        merchantName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategoriesByUserId($userId: Int!) {\n    getCategoriesByUserId(userId: $userId) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n      Transactions {\n        id\n        date\n        amount\n        merchantName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategoryById($id: Int!) {\n    getCategoryById(id: $id) {\n      name\n      colour\n    }\n  }\n  "): (typeof documents)["\n  query GetCategoryById($id: Int!) {\n    getCategoryById(id: $id) {\n      name\n      colour\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($name: String!, $userId: Int!, $description: String) {\n    createCategory(name: $name, userId: $userId, description: $description) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!, $userId: Int!, $description: String) {\n    createCategory(name: $name, userId: $userId, description: $description) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      id\n      name\n      description\n      userId\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  "): (typeof documents)["\n  mutation DeleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      id\n      name\n      description\n      userId\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCategory($id: Int!, $name: String, $description: String, $colour: String) {\n    updateCategory(id: $id, name: $name, description: $description, colour: $colour) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  "): (typeof documents)["\n  mutation UpdateCategory($id: Int!, $name: String, $description: String, $colour: String) {\n    updateCategory(id: $id, name: $name, description: $description, colour: $colour) {\n      id\n      name\n      description\n      userId\n      colour\n      User {\n        username\n        firstName\n        lastName\n        email\n        uid\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n"): (typeof documents)["\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        Account {\n          name\n        }\n        io\n        name\n        merchantName\n        amount\n        categoryId\n        Category {\n          id\n          name\n          colour\n        }\n        date\n      }\n    }\n  "): (typeof documents)["\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        Account {\n          name\n        }\n        io\n        name\n        merchantName\n        amount\n        categoryId\n        Category {\n          id\n          name\n          colour\n        }\n        date\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "): (typeof documents)["\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTransaction($id: Int!, $name: String, $merchantName: String, $categoryId: Int) {\n    updateTransaction(id: $id, name: $name, merchantName: $merchantName, categoryId: $categoryId) {\n      id\n      name\n      merchantName\n      Category {\n        id\n        name\n        colour\n      }\n    }\n  }\n  "): (typeof documents)["\n  mutation UpdateTransaction($id: Int!, $name: String, $merchantName: String, $categoryId: Int) {\n    updateTransaction(id: $id, name: $name, merchantName: $merchantName, categoryId: $categoryId) {\n      id\n      name\n      merchantName\n      Category {\n        id\n        name\n        colour\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    getAllUsers {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    getAllUsers {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserbyId($userId: Int!) {\n    getUserById(userId: $userId) {\n      accessToken\n    }\n  }\n  "): (typeof documents)["\n  query GetUserbyId($userId: Int!) {\n    getUserById(userId: $userId) {\n      accessToken\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($uid: String!) {\n    getUserByUid (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($uid: String!) {\n    getUserByUid (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUserUidFromUserId($userId: Int!) {\n    getUserById(userId: $userId) {\n        uid\n    }\n}\n"): (typeof documents)["\nquery GetUserUidFromUserId($userId: Int!) {\n    getUserById(userId: $userId) {\n        uid\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;