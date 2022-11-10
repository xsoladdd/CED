/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation employee_auth_mutation($input: LoginInput!) {\n  employee_auth(input: $input) {\n    token\n  }\n}": types.Employee_Auth_MutationDocument,
    "query employee_detail_query {\n  employee_detail {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}": types.Employee_Detail_QueryDocument,
    "query get_global_vars_query {\n  get_globa_vars {\n    school_year {\n      title\n      value\n    }\n  }\n}": types.Get_Global_Vars_QueryDocument,
    "query meowQuery {\n  meow\n}": types.MeowQueryDocument,
    "query ping {\n  meow_but_need_token\n}": types.PingDocument,
};

export function graphql(source: "mutation employee_auth_mutation($input: LoginInput!) {\n  employee_auth(input: $input) {\n    token\n  }\n}"): (typeof documents)["mutation employee_auth_mutation($input: LoginInput!) {\n  employee_auth(input: $input) {\n    token\n  }\n}"];
export function graphql(source: "query employee_detail_query {\n  employee_detail {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"): (typeof documents)["query employee_detail_query {\n  employee_detail {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"];
export function graphql(source: "query get_global_vars_query {\n  get_globa_vars {\n    school_year {\n      title\n      value\n    }\n  }\n}"): (typeof documents)["query get_global_vars_query {\n  get_globa_vars {\n    school_year {\n      title\n      value\n    }\n  }\n}"];
export function graphql(source: "query meowQuery {\n  meow\n}"): (typeof documents)["query meowQuery {\n  meow\n}"];
export function graphql(source: "query ping {\n  meow_but_need_token\n}"): (typeof documents)["query ping {\n  meow_but_need_token\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;