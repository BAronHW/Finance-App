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
    "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n": types.CreateLinkTokenDocument,
    "\n  mutation ExchangePublicToken($userId: String!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token) {\n        accessToken\n        item_id\n        request_id\n    }\n  }\n": types.ExchangePublicTokenDocument,
    "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  ": types.GetTransactionsByUserIdDocument,
    "\n  mutation UpsertTransactions($userId: Int!, $accountId: Int, $access_token: String!, $start_date: String!, $end_date: String!) {\n    upsertTransactions(userId: $userId, access_token: $access_token, start_date: $start_date, end_date: $end_date) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  ": types.UpsertTransactionsDocument,
    "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n": types.UserDocument,
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
export function gql(source: "\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLinkToken {\n    createLinkToken {\n      link_token\n      expiration\n      request_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ExchangePublicToken($userId: String!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token) {\n        accessToken\n        item_id\n        request_id\n    }\n  }\n"): (typeof documents)["\n  mutation ExchangePublicToken($userId: String!, $public_token: String!) {\n    exchangePublicToken(userId: $userId, public_token: $public_token) {\n        accessToken\n        item_id\n        request_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  "): (typeof documents)["\n    query GetTransactionsByUserId($userId: Int!) {\n      getTransactionsByUserId(userId: $userId) {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpsertTransactions($userId: Int!, $accountId: Int, $access_token: String!, $start_date: String!, $end_date: String!) {\n    upsertTransactions(userId: $userId, access_token: $access_token, start_date: $start_date, end_date: $end_date) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "): (typeof documents)["\n  mutation UpsertTransactions($userId: Int!, $accountId: Int, $access_token: String!, $start_date: String!, $end_date: String!) {\n    upsertTransactions(userId: $userId, access_token: $access_token, start_date: $start_date, end_date: $end_date) {\n      id\n      userId\n      merchantName\n      amount\n      date\n      plaidId\n    }}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      transactions {\n        id\n        userId\n        accountId\n        io\n        name\n        merchantName\n        amount\n        category\n        date\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;