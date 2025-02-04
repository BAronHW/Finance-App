/* eslint-disable */
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
  /** For anything to not lock yourself in strict types */
  Any: { input: any; output: any; }
  /** For representing data in ISO format */
  Date: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken?: Maybe<Scalars['String']['output']>;
  item_id?: Maybe<Scalars['String']['output']>;
  request_id?: Maybe<Scalars['String']['output']>;
};

export type Account = {
  __typename?: 'Account';
  Transactions?: Maybe<Array<Transaction>>;
  User: User;
  available?: Maybe<Scalars['Float']['output']>;
  current?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  isoCurrencyCode?: Maybe<Scalars['String']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  mask?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  officialName?: Maybe<Scalars['String']['output']>;
  plaidId: Scalars['String']['output'];
  subtype?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  unofficialCurrencyCode?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
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
  createAccount: Account;
  createLinkToken?: Maybe<LinkToken>;
  createTransaction: Transaction;
  createUser: User;
  deleteAccount: Account;
  deleteTransaction?: Maybe<Transaction>;
  deleteUser: User;
  emailSignIn: User;
  exchangePublicToken: Scalars['String']['output'];
  updateUserDetails: User;
  upsertAccountsFromPlaid: Array<Account>;
  upsertTransactionsFromPlaid: Array<Transaction>;
};


export type MutationCreateAccountArgs = {
  available: Scalars['Float']['input'];
  current: Scalars['Float']['input'];
  isoCurrencyCode?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  officialName?: InputMaybe<Scalars['String']['input']>;
  plaidId: Scalars['String']['input'];
  subtype?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  unofficialCurrencyCode?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationCreateTransactionArgs = {
  accountId?: InputMaybe<Scalars['Int']['input']>;
  amount: Scalars['Float']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['Int']['input'];
  merchantName: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  plaidId: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
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


export type MutationDeleteAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['Int']['input'];
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


export type MutationUpsertAccountsFromPlaidArgs = {
  accessToken: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpsertTransactionsFromPlaidArgs = {
  accessToken: Scalars['String']['input'];
  accountId?: InputMaybe<Scalars['Int']['input']>;
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
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
  fetchAccessTokenFromUser?: Maybe<Scalars['String']['output']>;
  getAccountsByUserId: Array<Account>;
  getAllAccounts: Array<Account>;
  getTransactionById: Transaction;
  getTransactionsByUserId: Array<Transaction>;
  user: User;
  users: Array<User>;
};


export type QueryFetchAccessTokenFromUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetAccountsByUserIdArgs = {
  userId: Scalars['Int']['input'];
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
  Account?: Maybe<Account>;
  User?: Maybe<User>;
  accountId?: Maybe<Scalars['Int']['output']>;
  amount: Scalars['Float']['output'];
  category?: Maybe<Scalars['String']['output']>;
  date: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  io?: Maybe<InOrOutEnum>;
  merchantName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  plaidId: Scalars['String']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
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
  AccessToken?: Maybe<Scalars['String']['output']>;
  Accounts: Array<Array<Account>>;
  Transactions: Array<Array<Transaction>>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GetAccountsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetAccountsByUserIdQuery = { __typename?: 'Query', getAccountsByUserId: Array<{ __typename?: 'Account', id: number, mask?: string | null, name: string, officialName?: string | null, subtype?: string | null, type: string, plaidId: string, available?: number | null, current?: number | null, isoCurrencyCode?: string | null, unofficialCurrencyCode?: string | null, limit?: number | null, Transactions?: Array<{ __typename?: 'Transaction', userId?: number | null, merchantName: string, amount: number }> | null }> };

export type UpsertAccountsFromPlaidMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  accessToken: Scalars['String']['input'];
}>;


export type UpsertAccountsFromPlaidMutation = { __typename?: 'Mutation', upsertAccountsFromPlaid: Array<{ __typename?: 'Account', id: number, name: string, plaidId: string }> };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'Account', id: number, mask?: string | null, name: string, officialName?: string | null, subtype?: string | null, type: string, plaidId: string, available?: number | null, current?: number | null, isoCurrencyCode?: string | null, unofficialCurrencyCode?: string | null, limit?: number | null, Transactions?: Array<{ __typename?: 'Transaction', userId?: number | null, merchantName: string, amount: number }> | null } };

export type CreateLinkTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateLinkTokenMutation = { __typename?: 'Mutation', createLinkToken?: { __typename?: 'LinkToken', link_token?: string | null, expiration?: string | null, request_id?: string | null } | null };

export type ExchangePublicTokenMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  public_token: Scalars['String']['input'];
}>;


export type ExchangePublicTokenMutation = { __typename?: 'Mutation', exchangePublicToken: string };

export type GetTransactionsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetTransactionsByUserIdQuery = { __typename?: 'Query', getTransactionsByUserId: Array<{ __typename?: 'Transaction', id: number, userId?: number | null, accountId?: number | null, io?: InOrOutEnum | null, name?: string | null, merchantName: string, amount: number, category?: string | null, date: number }> };

export type UpsertTransactionsFromPlaidMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  accountId?: InputMaybe<Scalars['Int']['input']>;
  accessToken: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
}>;


export type UpsertTransactionsFromPlaidMutation = { __typename?: 'Mutation', upsertTransactionsFromPlaid: Array<{ __typename?: 'Transaction', id: number, userId?: number | null, merchantName: string, amount: number, date: number, plaidId: string }> };


export const GetAccountsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccountsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mask"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"Transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plaidId"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"isoCurrencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"unofficialCurrencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<GetAccountsByUserIdQuery, GetAccountsByUserIdQueryVariables>;
export const UpsertAccountsFromPlaidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertAccountsFromPlaid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertAccountsFromPlaid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accessToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"plaidId"}}]}}]}}]} as unknown as DocumentNode<UpsertAccountsFromPlaidMutation, UpsertAccountsFromPlaidMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mask"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"officialName"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"Transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plaidId"}},{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"current"}},{"kind":"Field","name":{"kind":"Name","value":"isoCurrencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"unofficialCurrencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const CreateLinkTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLinkToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLinkToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link_token"}},{"kind":"Field","name":{"kind":"Name","value":"expiration"}},{"kind":"Field","name":{"kind":"Name","value":"request_id"}}]}}]}}]} as unknown as DocumentNode<CreateLinkTokenMutation, CreateLinkTokenMutationVariables>;
export const ExchangePublicTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExchangePublicToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public_token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangePublicToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"public_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public_token"}}}]}]}}]} as unknown as DocumentNode<ExchangePublicTokenMutation, ExchangePublicTokenMutationVariables>;
export const GetTransactionsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactionsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactionsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"io"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetTransactionsByUserIdQuery, GetTransactionsByUserIdQueryVariables>;
export const UpsertTransactionsFromPlaidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertTransactionsFromPlaid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTransactionsFromPlaid"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accessToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"merchantName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"plaidId"}}]}}]}}]} as unknown as DocumentNode<UpsertTransactionsFromPlaidMutation, UpsertTransactionsFromPlaidMutationVariables>;