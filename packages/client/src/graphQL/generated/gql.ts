/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}": types.AuthMutationDocument,
    "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}": types.GetMeDocument,
    "query getEmployeesQuery($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}": types.GetEmployeesQueryDocument,
    "query Ping {\n  meow\n}": types.PingDocument,
};

export function graphql(source: "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"): (typeof documents)["mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"];
export function graphql(source: "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"): (typeof documents)["query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"];
export function graphql(source: "query getEmployeesQuery($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}"): (typeof documents)["query getEmployeesQuery($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}"];
export function graphql(source: "query Ping {\n  meow\n}"): (typeof documents)["query Ping {\n  meow\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;