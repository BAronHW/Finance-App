/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date and time custom scalar type
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date and time custom scalar type
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Account: { // root type
    balance: number; // Float!
    createdAt: string; // String!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: string; // String!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    firstName?: string | null; // String
    id: number; // Int!
    lastName?: string | null; // String
    password?: string | null; // String
    phone?: string | null; // String
    uid?: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Account: { // field return type
    balance: number; // Float!
    createdAt: string; // String!
    id: number; // Int!
    name: string; // String!
    type: string; // String!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createAccount: NexusGenRootTypes['Account']; // Account!
    createUser: NexusGenRootTypes['User']; // User!
    deleteUser: NexusGenRootTypes['User']; // User!
    emailSignIn: NexusGenRootTypes['User']; // User!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    account: NexusGenRootTypes['Account'] | null; // Account
    getAccountsByUserId: NexusGenRootTypes['Account'][]; // [Account!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    email: string; // String!
    firstName: string | null; // String
    id: number; // Int!
    lastName: string | null; // String
    password: string | null; // String
    phone: string | null; // String
    uid: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    balance: 'Float'
    createdAt: 'String'
    id: 'Int'
    name: 'String'
    type: 'String'
    updatedAt: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createAccount: 'Account'
    createUser: 'User'
    deleteUser: 'User'
    emailSignIn: 'User'
    updateUser: 'User'
  }
  Query: { // field return type name
    account: 'Account'
    getAccountsByUserId: 'Account'
    user: 'User'
    users: 'User'
  }
  User: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    password: 'String'
    phone: 'String'
    uid: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAccount: { // args
      balance: number; // Float!
      name: string; // String!
      type: string; // String!
      userId: number; // Int!
    }
    createUser: { // args
      email: string; // String!
      firstName?: string | null; // String
      lastName?: string | null; // String
      password?: string | null; // String
      phone?: string | null; // String
      uid?: string | null; // String
      username: string; // String!
    }
    deleteUser: { // args
      id: number; // Int!
    }
    emailSignIn: { // args
      password: string; // String!
      username: string; // String!
    }
    updateUser: { // args
      email: string; // String!
      firstName?: string | null; // String
      id: number; // Int!
      lastName?: string | null; // String
      password?: string | null; // String
      phone?: string | null; // String
      uid?: string | null; // String
      username: string; // String!
    }
  }
  Query: {
    account: { // args
      id: number; // Int!
    }
    getAccountsByUserId: { // args
      userId: number; // Int!
    }
    user: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

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