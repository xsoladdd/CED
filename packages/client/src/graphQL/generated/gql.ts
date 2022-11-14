/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}": types.AuthMutationDocument,
    "mutation disableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId)\n}": types.DisableEmployeeDocument,
    "mutation enableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId)\n}": types.EnableEmployeeDocument,
    "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}": types.GetMeDocument,
    "query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    action_type\n    description\n    employee {\n      employee_id\n      profile {\n        first_name\n        last_name\n      }\n      role\n    }\n    timestamp\n    id\n  }\n}": types.GetAuditTrailsDocument,
    "query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}": types.GetEmployeesDocument,
    "query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}": types.GetGlobalVarsDocument,
    "query Ping {\n  meow\n}": types.PingDocument,
};

export function graphql(source: "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"): (typeof documents)["mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"];
export function graphql(source: "mutation disableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId)\n}"): (typeof documents)["mutation disableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId)\n}"];
export function graphql(source: "mutation enableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId)\n}"): (typeof documents)["mutation enableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId)\n}"];
export function graphql(source: "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"): (typeof documents)["query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"];
export function graphql(source: "query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    action_type\n    description\n    employee {\n      employee_id\n      profile {\n        first_name\n        last_name\n      }\n      role\n    }\n    timestamp\n    id\n  }\n}"): (typeof documents)["query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    action_type\n    description\n    employee {\n      employee_id\n      profile {\n        first_name\n        last_name\n      }\n      role\n    }\n    timestamp\n    id\n  }\n}"];
export function graphql(source: "query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}"): (typeof documents)["query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    employee_id\n    id\n    partial_password\n    role\n    status\n    profile {\n      first_name\n      id\n      middle_name\n      last_name\n    }\n  }\n}"];
export function graphql(source: "query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}"): (typeof documents)["query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}"];
export function graphql(source: "query Ping {\n  meow\n}"): (typeof documents)["query Ping {\n  meow\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;