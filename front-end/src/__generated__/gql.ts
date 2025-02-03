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
    "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n": types.CreateLinkTokenDocument,
    "\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n": types.ExchangePublicTokenDocument,
    "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  ": types.GetTransactionsByUserIdDocument,
    "\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  ": types.UpsertTransactionsFromPlaidDocument,
    "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  query FetchAccessTokenFromUser($userId: Int!) {\n    fetchAccessTokenFromUser(userId: $userId) \n  }\n  ": types.FetchAccessTokenFromUserDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.UserDocument,
    "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n": types.CreateUserDocument,
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
export function gql(source: "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n"): (typeof documents)["\n  mutation ExchangePublicToken($userId: Int!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  "): (typeof documents)["\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "): (typeof documents)["\n  mutation UpsertTransactionsFromPlaid($userId: Int!, $accountId: Int, $accessToken: String!, $startDate: String!, $endDate: String!) {\n    upsertTransactionsFromPlaid(userId: $userId, accountId: $accountId, accessToken: $accessToken, startDate: $startDate, endDate: $endDate) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchAccessTokenFromUser($userId: Int!) {\n    fetchAccessTokenFromUser(userId: $userId) \n  }\n  "): (typeof documents)["\n  query FetchAccessTokenFromUser($userId: Int!) {\n    fetchAccessTokenFromUser(userId: $userId) \n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      Transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;