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
    "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n    }\n  }\n": types.UsersDocument,
    "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n": types.UserDocument,
    "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: Int!) {\n    deleteUser(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n"): (typeof documents)["\n  query User($uid: String!) {\n    user (uid: $uid) {\n      id\n      firstName\n      lastName\n      username\n      password\n      phone\n      email\n      uid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String\n    $lastName: String\n    $username: String!\n    $password: String\n    $email: String!\n    $uid: String!\n    $phone: String\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      password: $password\n      email: $email\n      uid: $uid\n      phone: $phone\n    ) {\n      id\n      firstName\n      lastName\n      username\n      password\n      email\n      uid\n      phone\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;