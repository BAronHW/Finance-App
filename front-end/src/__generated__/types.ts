import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken?: Maybe<Scalars['String']['output']>;
  item_id?: Maybe<Scalars['String']['output']>;
  request_id?: Maybe<Scalars['String']['output']>;
};

export type Account = {
  __typename?: 'Account';
  account_id?: Maybe<Scalars['String']['output']>;
  balances?: Maybe<Balances>;
  mask?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  subtype?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Balances = {
  __typename?: 'Balances';
  available?: Maybe<Scalars['Float']['output']>;
  current?: Maybe<Scalars['Float']['output']>;
  iso_currency_code?: Maybe<Scalars['String']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  unofficial_currency_code?: Maybe<Scalars['String']['output']>;
};

export type Counterparty = {
  __typename?: 'Counterparty';
  confidence_level?: Maybe<Scalars['String']['output']>;
  entity_id?: Maybe<Scalars['String']['output']>;
  logo_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum InOrOutEnum {
  In = 'IN',
  Out = 'OUT'
}

export type Item = {
  __typename?: 'Item';
  auth_method?: Maybe<Scalars['String']['output']>;
  available_products?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  billed_products?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  consent_expiration_time?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  institution_id?: Maybe<Scalars['String']['output']>;
  institution_name?: Maybe<Scalars['String']['output']>;
  item_id?: Maybe<Scalars['String']['output']>;
  update_type?: Maybe<Scalars['String']['output']>;
  webhook?: Maybe<Scalars['String']['output']>;
};

export type LinkToken = {
  __typename?: 'LinkToken';
  expiration?: Maybe<Scalars['String']['output']>;
  link_token?: Maybe<Scalars['String']['output']>;
  request_id?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  store_number?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLinkToken?: Maybe<LinkToken>;
  createUser: User;
  deleteUser: User;
  emailSignIn: User;
  exchangePublicToken?: Maybe<AccessToken>;
  seedTransactions: Scalars['Boolean']['output'];
  updateUserDetails: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEmailSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationExchangePublicTokenArgs = {
  public_token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSeedTransactionsArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUpdateUserDetailsArgs = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type PaymentMeta = {
  __typename?: 'PaymentMeta';
  by_order_of?: Maybe<Scalars['String']['output']>;
  payee?: Maybe<Scalars['String']['output']>;
  payer?: Maybe<Scalars['String']['output']>;
  payment_method?: Maybe<Scalars['String']['output']>;
  payment_processor?: Maybe<Scalars['String']['output']>;
  ppd_id?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  reference_number?: Maybe<Scalars['String']['output']>;
};

export type PersonalFinanceCategory = {
  __typename?: 'PersonalFinanceCategory';
  confidence_level?: Maybe<Scalars['String']['output']>;
  detailed?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allTransactions: Array<Transaction>;
  getTransactionById: Transaction;
  getTransactionsByUserId: Array<Maybe<Transaction>>;
  user: User;
  users: Array<User>;
};


export type QueryGetTransactionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTransactionsByUserIdArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  uid: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  accountName: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  category?: Maybe<Scalars['String']['output']>;
  date: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  io: InOrOutEnum;
  name: Scalars['String']['output'];
  reference?: Maybe<Scalars['String']['output']>;
  senderOrRecipientName: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type TransactionRes = {
  __typename?: 'TransactionRes';
  accounts?: Maybe<Array<Maybe<Account>>>;
  item?: Maybe<Item>;
  request_id?: Maybe<Scalars['String']['output']>;
  total_transactions?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  transactions: Array<Maybe<Transaction>>;
  uid: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateLinkTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateLinkTokenMutation = { __typename?: 'Mutation', createLinkToken?: { __typename?: 'LinkToken', link_token?: string | null, expiration?: string | null, request_id?: string | null } | null };

export type ExchangePublicTokenMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  public_token: Scalars['String']['input'];
}>;


export type ExchangePublicTokenMutation = { __typename?: 'Mutation', exchangePublicToken?: { __typename?: 'AccessToken', accessToken?: string | null, item_id?: string | null, request_id?: string | null } | null };

export type GetTransactionsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetTransactionsByUserIdQuery = { __typename?: 'Query', getTransactionsByUserId: Array<{ __typename?: 'Transaction', id: number, userId: number, accountName: string, io: InOrOutEnum, name: string, senderOrRecipientName: string, amount: number, reference?: string | null, category?: string | null, date: number } | null> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', firstName?: string | null, lastName?: string | null, username: string, password?: string | null, phone?: string | null, email: string, uid: string, id: number, transactions: Array<{ __typename?: 'Transaction', id: number, userId: number, accountName: string, io: InOrOutEnum, name: string, senderOrRecipientName: string, amount: number, reference?: string | null, category?: string | null, date: number } | null> }> };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, username: string, password?: string | null, phone?: string | null, email: string, uid: string, transactions: Array<{ __typename?: 'Transaction', id: number, userId: number, accountName: string, io: InOrOutEnum, name: string, senderOrRecipientName: string, amount: number, reference?: string | null, category?: string | null, date: number } | null> } };

export type UserQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, username: string, password?: string | null, phone?: string | null, email: string, uid: string, transactions: Array<{ __typename?: 'Transaction', id: number, userId: number, accountName: string, io: InOrOutEnum, name: string, senderOrRecipientName: string, amount: number, reference?: string | null, category?: string | null, date: number } | null> } };

export type CreateUserMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  uid: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, username: string, password?: string | null, email: string, uid: string, phone?: string | null } };


export const CreateLinkTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLinkToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLinkToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link_token"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"request_id"}}]}}]}}]} as unknown as DocumentNode<CreateLinkTokenMutation, CreateLinkTokenMutationVariables>;
export const ExchangePublicTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExchangePublicToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangePublicToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"public_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public_token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"request_id"}}]}}]}}]} as unknown as DocumentNode<ExchangePublicTokenMutation, ExchangePublicTokenMutationVariables>;
export const GetTransactionsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactionsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactionsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"io"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"senderOrRecipientName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetTransactionsByUserIdQuery, GetTransactionsByUserIdQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"io"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"senderOrRecipientName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"io"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"senderOrRecipientName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"io"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"senderOrRecipientName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;