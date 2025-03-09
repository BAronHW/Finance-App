/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  InOrOutEnum: "IN" | "OUT"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Any: any
  Date: any
}

export interface NexusGenObjects {
  AccessToken: { // root type
    accessToken?: string | null; // String
    item_id?: string | null; // String
    request_id?: string | null; // String
  }
  Account: { // root type
    Transactions?: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    User?: NexusGenRootTypes['User'] | null; // User
    available?: number | null; // Float
    current?: number | null; // Float
    id: number; // Int!
    isoCurrencyCode?: string | null; // String
    limit?: number | null; // Float
    mask?: string | null; // String
    name: string; // String!
    officialName?: string | null; // String
    plaidId?: string | null; // String
    subtype?: string | null; // String
    type?: string | null; // String
    unofficialCurrencyCode?: string | null; // String
    userId?: number | null; // Int
  }
  Category: { // root type
    Transactions?: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    User?: NexusGenRootTypes['User'] | null; // User
    colour?: string | null; // String
    description?: string | null; // String
    id: number; // Int!
    name: string; // String!
    userId?: number | null; // Int
  }
  Counterparty: { // root type
    confidence_level?: string | null; // String
    entity_id?: string | null; // String
    logo_url?: string | null; // String
    name?: string | null; // String
    type?: string | null; // String
    website?: string | null; // String
  }
  Document: { // root type
    key: string; // String!
    name?: string | null; // String
    size: number; // Int!
    uid: string; // String!
  }
  Item: { // root type
    auth_method?: string | null; // String
    available_products?: Array<string | null> | null; // [String]
    billed_products?: Array<string | null> | null; // [String]
    consent_expiration_time?: string | null; // String
    error?: string | null; // String
    institution_id?: string | null; // String
    institution_name?: string | null; // String
    item_id?: string | null; // String
    update_type?: string | null; // String
    webhook?: string | null; // String
  }
  LinkToken: { // root type
    expiration?: string | null; // String
    link_token?: string | null; // String
    request_id?: string | null; // String
  }
  Location: { // root type
    address?: string | null; // String
    city?: string | null; // String
    country?: string | null; // String
    lat?: number | null; // Float
    lon?: number | null; // Float
    postal_code?: string | null; // String
    region?: string | null; // String
    store_number?: string | null; // String
  }
  Mutation: {};
  PaymentMeta: { // root type
    by_order_of?: string | null; // String
    payee?: string | null; // String
    payer?: string | null; // String
    payment_method?: string | null; // String
    payment_processor?: string | null; // String
    ppd_id?: string | null; // String
    reason?: string | null; // String
    reference_number?: string | null; // String
  }
  PersonalFinanceCategory: { // root type
    confidence_level?: string | null; // String
    detailed?: string | null; // String
    primary?: string | null; // String
  }
  Query: {};
  Transaction: { // root type
    Account?: NexusGenRootTypes['Account'] | null; // Account
    Category?: NexusGenRootTypes['Category'] | null; // Category
    User?: NexusGenRootTypes['User'] | null; // User
    accountId?: number | null; // Int
    amount: number; // Float!
    categoryId?: number | null; // Int
    date: number; // Int!
    id: number; // Int!
    merchantName: string; // String!
    name?: string | null; // String
    plaidId: string; // String!
    userId?: number | null; // Int
  }
  TransactionRes: { // root type
    accounts?: Array<NexusGenRootTypes['Account'] | null> | null; // [Account]
    item?: NexusGenRootTypes['Item'] | null; // Item
    request_id?: string | null; // String
    total_transactions?: number | null; // Int
    transactions?: Array<NexusGenRootTypes['Transaction'] | null> | null; // [Transaction]
  }
  User: { // root type
    Accounts?: NexusGenRootTypes['Account'][] | null; // [Account!]
    Transactions?: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    accessToken?: string | null; // String
    email: string; // String!
    firstName?: string | null; // String
    id: number; // Int!
    lastName?: string | null; // String
    password?: string | null; // String
    phone?: string | null; // String
    uid: string; // String!
    username: string; // String!
  }
  s3Object: { // root type
    contentType?: string | null; // String
    file: string; // String!
    key: string; // String!
    lastModified?: string | null; // String
    name: string; // String!
    size: number; // Int!
    uid: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AccessToken: { // field return type
    accessToken: string | null; // String
    item_id: string | null; // String
    request_id: string | null; // String
  }
  Account: { // field return type
    Transactions: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    User: NexusGenRootTypes['User'] | null; // User
    available: number | null; // Float
    current: number | null; // Float
    id: number; // Int!
    isoCurrencyCode: string | null; // String
    limit: number | null; // Float
    mask: string | null; // String
    name: string; // String!
    officialName: string | null; // String
    plaidId: string | null; // String
    subtype: string | null; // String
    type: string | null; // String
    unofficialCurrencyCode: string | null; // String
    userId: number | null; // Int
  }
  Category: { // field return type
    Transactions: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    User: NexusGenRootTypes['User'] | null; // User
    colour: string | null; // String
    description: string | null; // String
    id: number; // Int!
    name: string; // String!
    userId: number | null; // Int
  }
  Counterparty: { // field return type
    confidence_level: string | null; // String
    entity_id: string | null; // String
    logo_url: string | null; // String
    name: string | null; // String
    type: string | null; // String
    website: string | null; // String
  }
  Document: { // field return type
    key: string; // String!
    name: string | null; // String
    size: number; // Int!
    uid: string; // String!
  }
  Item: { // field return type
    auth_method: string | null; // String
    available_products: Array<string | null> | null; // [String]
    billed_products: Array<string | null> | null; // [String]
    consent_expiration_time: string | null; // String
    error: string | null; // String
    institution_id: string | null; // String
    institution_name: string | null; // String
    item_id: string | null; // String
    update_type: string | null; // String
    webhook: string | null; // String
  }
  LinkToken: { // field return type
    expiration: string | null; // String
    link_token: string | null; // String
    request_id: string | null; // String
  }
  Location: { // field return type
    address: string | null; // String
    city: string | null; // String
    country: string | null; // String
    lat: number | null; // Float
    lon: number | null; // Float
    postal_code: string | null; // String
    region: string | null; // String
    store_number: string | null; // String
  }
  Mutation: { // field return type
    analyseSinglePdfWithAI: boolean | null; // Boolean
    createAccount: NexusGenRootTypes['Account']; // Account!
    createCategory: NexusGenRootTypes['Category']; // Category!
    createLinkToken: NexusGenRootTypes['LinkToken'] | null; // LinkToken
    createTransaction: NexusGenRootTypes['Transaction']; // Transaction!
    createUser: NexusGenRootTypes['User']; // User!
    deleteAccount: NexusGenRootTypes['Account']; // Account!
    deleteAllDocumentsAssociatedWithUserInBucketByUid: boolean | null; // Boolean
    deleteCategory: NexusGenRootTypes['Category']; // Category!
    deleteDocumentByKey: boolean | null; // Boolean
    deleteTransaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    deleteUser: NexusGenRootTypes['User']; // User!
    emailSignIn: NexusGenRootTypes['User']; // User!
    exchangePublicToken: string; // String!
    updateCategory: NexusGenRootTypes['Category']; // Category!
    updateTransaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    updateUserDetails: NexusGenRootTypes['User']; // User!
    uploadPdf: NexusGenScalars['Any'] | null; // Any
    upsertAccountsFromPlaid: NexusGenRootTypes['Account'][]; // [Account!]!
    upsertTransactionsFromPlaid: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
  }
  PaymentMeta: { // field return type
    by_order_of: string | null; // String
    payee: string | null; // String
    payer: string | null; // String
    payment_method: string | null; // String
    payment_processor: string | null; // String
    ppd_id: string | null; // String
    reason: string | null; // String
    reference_number: string | null; // String
  }
  PersonalFinanceCategory: { // field return type
    confidence_level: string | null; // String
    detailed: string | null; // String
    primary: string | null; // String
  }
  Query: { // field return type
    allTransactions: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
    getALLPDFURLBelongingToUserByUid: string[]; // [String!]!
    getAccountsByUserId: NexusGenRootTypes['Account'][]; // [Account!]!
    getAllAccounts: NexusGenRootTypes['Account'][]; // [Account!]!
    getAllPdfBelongingToUserByUid: NexusGenRootTypes['Document'][]; // [Document!]!
    getAllPdfBuffersByUid: NexusGenScalars['Any'][] | null; // [Any!]
    getAllUsers: NexusGenRootTypes['User'][]; // [User!]!
    getCategoriesByUserId: NexusGenRootTypes['Category'][]; // [Category!]!
    getCategoryById: NexusGenRootTypes['Category']; // Category!
    getPdfUrlByKey: NexusGenScalars['Any'] | null; // Any
    getTransactionById: NexusGenRootTypes['Transaction']; // Transaction!
    getTransactionsByUserId: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
    getUserById: NexusGenRootTypes['User'] | null; // User
    getUserByUid: NexusGenRootTypes['User']; // User!
  }
  Transaction: { // field return type
    Account: NexusGenRootTypes['Account'] | null; // Account
    Category: NexusGenRootTypes['Category'] | null; // Category
    User: NexusGenRootTypes['User'] | null; // User
    accountId: number | null; // Int
    amount: number; // Float!
    categoryId: number | null; // Int
    date: number; // Int!
    id: number; // Int!
    io: NexusGenEnums['InOrOutEnum'] | null; // InOrOutEnum
    merchantName: string; // String!
    name: string | null; // String
    plaidId: string; // String!
    userId: number | null; // Int
  }
  TransactionRes: { // field return type
    accounts: Array<NexusGenRootTypes['Account'] | null> | null; // [Account]
    item: NexusGenRootTypes['Item'] | null; // Item
    request_id: string | null; // String
    total_transactions: number | null; // Int
    transactions: Array<NexusGenRootTypes['Transaction'] | null> | null; // [Transaction]
  }
  User: { // field return type
    Accounts: NexusGenRootTypes['Account'][] | null; // [Account!]
    Transactions: NexusGenRootTypes['Transaction'][] | null; // [Transaction!]
    accessToken: string | null; // String
    email: string; // String!
    firstName: string | null; // String
    id: number; // Int!
    lastName: string | null; // String
    password: string | null; // String
    phone: string | null; // String
    uid: string; // String!
    username: string; // String!
  }
  s3Object: { // field return type
    contentType: string | null; // String
    file: string; // String!
    key: string; // String!
    lastModified: string | null; // String
    name: string; // String!
    size: number; // Int!
    uid: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AccessToken: { // field return type name
    accessToken: 'String'
    item_id: 'String'
    request_id: 'String'
  }
  Account: { // field return type name
    Transactions: 'Transaction'
    User: 'User'
    available: 'Float'
    current: 'Float'
    id: 'Int'
    isoCurrencyCode: 'String'
    limit: 'Float'
    mask: 'String'
    name: 'String'
    officialName: 'String'
    plaidId: 'String'
    subtype: 'String'
    type: 'String'
    unofficialCurrencyCode: 'String'
    userId: 'Int'
  }
  Category: { // field return type name
    Transactions: 'Transaction'
    User: 'User'
    colour: 'String'
    description: 'String'
    id: 'Int'
    name: 'String'
    userId: 'Int'
  }
  Counterparty: { // field return type name
    confidence_level: 'String'
    entity_id: 'String'
    logo_url: 'String'
    name: 'String'
    type: 'String'
    website: 'String'
  }
  Document: { // field return type name
    key: 'String'
    name: 'String'
    size: 'Int'
    uid: 'String'
  }
  Item: { // field return type name
    auth_method: 'String'
    available_products: 'String'
    billed_products: 'String'
    consent_expiration_time: 'String'
    error: 'String'
    institution_id: 'String'
    institution_name: 'String'
    item_id: 'String'
    update_type: 'String'
    webhook: 'String'
  }
  LinkToken: { // field return type name
    expiration: 'String'
    link_token: 'String'
    request_id: 'String'
  }
  Location: { // field return type name
    address: 'String'
    city: 'String'
    country: 'String'
    lat: 'Float'
    lon: 'Float'
    postal_code: 'String'
    region: 'String'
    store_number: 'String'
  }
  Mutation: { // field return type name
    analyseSinglePdfWithAI: 'Boolean'
    createAccount: 'Account'
    createCategory: 'Category'
    createLinkToken: 'LinkToken'
    createTransaction: 'Transaction'
    createUser: 'User'
    deleteAccount: 'Account'
    deleteAllDocumentsAssociatedWithUserInBucketByUid: 'Boolean'
    deleteCategory: 'Category'
    deleteDocumentByKey: 'Boolean'
    deleteTransaction: 'Transaction'
    deleteUser: 'User'
    emailSignIn: 'User'
    exchangePublicToken: 'String'
    updateCategory: 'Category'
    updateTransaction: 'Transaction'
    updateUserDetails: 'User'
    uploadPdf: 'Any'
    upsertAccountsFromPlaid: 'Account'
    upsertTransactionsFromPlaid: 'Transaction'
  }
  PaymentMeta: { // field return type name
    by_order_of: 'String'
    payee: 'String'
    payer: 'String'
    payment_method: 'String'
    payment_processor: 'String'
    ppd_id: 'String'
    reason: 'String'
    reference_number: 'String'
  }
  PersonalFinanceCategory: { // field return type name
    confidence_level: 'String'
    detailed: 'String'
    primary: 'String'
  }
  Query: { // field return type name
    allTransactions: 'Transaction'
    getALLPDFURLBelongingToUserByUid: 'String'
    getAccountsByUserId: 'Account'
    getAllAccounts: 'Account'
    getAllPdfBelongingToUserByUid: 'Document'
    getAllPdfBuffersByUid: 'Any'
    getAllUsers: 'User'
    getCategoriesByUserId: 'Category'
    getCategoryById: 'Category'
    getPdfUrlByKey: 'Any'
    getTransactionById: 'Transaction'
    getTransactionsByUserId: 'Transaction'
    getUserById: 'User'
    getUserByUid: 'User'
  }
  Transaction: { // field return type name
    Account: 'Account'
    Category: 'Category'
    User: 'User'
    accountId: 'Int'
    amount: 'Float'
    categoryId: 'Int'
    date: 'Int'
    id: 'Int'
    io: 'InOrOutEnum'
    merchantName: 'String'
    name: 'String'
    plaidId: 'String'
    userId: 'Int'
  }
  TransactionRes: { // field return type name
    accounts: 'Account'
    item: 'Item'
    request_id: 'String'
    total_transactions: 'Int'
    transactions: 'Transaction'
  }
  User: { // field return type name
    Accounts: 'Account'
    Transactions: 'Transaction'
    accessToken: 'String'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    password: 'String'
    phone: 'String'
    uid: 'String'
    username: 'String'
  }
  s3Object: { // field return type name
    contentType: 'String'
    file: 'String'
    key: 'String'
    lastModified: 'String'
    name: 'String'
    size: 'Int'
    uid: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    analyseSinglePdfWithAI: { // args
      pdfKey: string; // String!
    }
    createAccount: { // args
      available: number; // Float!
      current: number; // Float!
      isoCurrencyCode?: string | null; // String
      limit?: number | null; // Float
      mask?: string | null; // String
      name: string; // String!
      officialName?: string | null; // String
      plaidId: string; // String!
      subtype?: string | null; // String
      type: string; // String!
      unofficialCurrencyCode?: string | null; // String
      userId: number; // Int!
    }
    createCategory: { // args
      description?: string | null; // String
      name: string; // String!
      userId: number; // Int!
    }
    createTransaction: { // args
      accountId?: number | null; // Int
      amount: number; // Float!
      date: number; // Int!
      merchantName: string; // String!
      name?: string | null; // String
      plaidId: string; // String!
      userId: number; // Int!
    }
    createUser: { // args
      email: string; // String!
      firstName?: string | null; // String
      lastName?: string | null; // String
      password?: string | null; // String
      phone?: string | null; // String
      uid: string; // String!
      username: string; // String!
    }
    deleteAccount: { // args
      id: number; // Int!
    }
    deleteAllDocumentsAssociatedWithUserInBucketByUid: { // args
      uid: string; // String!
    }
    deleteCategory: { // args
      id: number; // Int!
    }
    deleteDocumentByKey: { // args
      documentKey: string; // String!
    }
    deleteTransaction: { // args
      id: number; // Int!
    }
    deleteUser: { // args
      id: number; // Int!
    }
    emailSignIn: { // args
      password: string; // String!
      username: string; // String!
    }
    exchangePublicToken: { // args
      public_token: string; // String!
      userId: number; // Int!
    }
    updateCategory: { // args
      colour?: string | null; // String
      description?: string | null; // String
      id: number; // Int!
      name?: string | null; // String
    }
    updateTransaction: { // args
      categoryId?: number | null; // Int
      id: number; // Int!
      merchantName?: string | null; // String
      name?: string | null; // String
    }
    updateUserDetails: { // args
      email: string; // String!
      firstName?: string | null; // String
      id: number; // Int!
      lastName?: string | null; // String
      password?: string | null; // String
      phone?: string | null; // String
      uid: string; // String!
      username: string; // String!
    }
    uploadPdf: { // args
      file: string; // String!
      name: string; // String!
      size: number; // Int!
      uid: string; // String!
    }
    upsertAccountsFromPlaid: { // args
      accessToken: string; // String!
      userId: number; // Int!
    }
    upsertTransactionsFromPlaid: { // args
      accessToken: string; // String!
      accountId?: number | null; // Int
      endDate: string; // String!
      startDate: string; // String!
      userId?: number | null; // Int
    }
  }
  Query: {
    getALLPDFURLBelongingToUserByUid: { // args
      uid: string; // String!
    }
    getAccountsByUserId: { // args
      userId: number; // Int!
    }
    getAllPdfBelongingToUserByUid: { // args
      uid: string; // String!
    }
    getAllPdfBuffersByUid: { // args
      uid: string; // String!
    }
    getCategoriesByUserId: { // args
      userId: number; // Int!
    }
    getCategoryById: { // args
      id: number; // Int!
    }
    getPdfUrlByKey: { // args
      key: string; // String!
    }
    getTransactionById: { // args
      id: number; // Int!
    }
    getTransactionsByUserId: { // args
      userId: number; // Int!
    }
    getUserById: { // args
      userId: number; // Int!
    }
    getUserByUid: { // args
      uid: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}