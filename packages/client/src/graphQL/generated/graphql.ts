/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuditTrail = {
  __typename?: 'AuditTrail';
  action_type_id: Scalars['String'];
  description: Scalars['String'];
  employee: Employee;
  id: Scalars['String'];
  timestamp: Scalars['String'];
};

export type Cat = {
  __typename?: 'Cat';
  age: Scalars['Float'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  audit?: Maybe<Array<AuditTrail>>;
  employee_id: Scalars['String'];
  id: Scalars['String'];
  partial_password?: Maybe<Scalars['String']>;
  profile?: Maybe<EmployeeProfile>;
  role: Scalars['String'];
  status?: Maybe<Scalars['Float']>;
};

export type EmployeeProfile = {
  __typename?: 'EmployeeProfile';
  first_name: Scalars['String'];
  id: Scalars['String'];
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
};

export type EnrolledRecords = {
  __typename?: 'EnrolledRecords';
  SY: Scalars['String'];
  grade_level_id: Scalars['String'];
  id: Scalars['String'];
  section_id: Scalars['String'];
  student: Student;
};

export type GlobalVars = {
  __typename?: 'GlobalVars';
  id: Scalars['String'];
  identifier: Scalars['String'];
  title: Scalars['String'];
  value: Scalars['String'];
};

export type GlobalVarsReturn = {
  __typename?: 'GlobalVarsReturn';
  school_year: GlobalVars;
};

export type LoginInput = {
  EID: Scalars['String'];
  password: Scalars['String'];
};

export type LoginReturn = {
  __typename?: 'LoginReturn';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  employee_auth: LoginReturn;
};


export type MutationEmployee_AuthArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  employee_detail: Employee;
  get_globa_vars: GlobalVarsReturn;
  meow: Scalars['String'];
  meow_but_need_token: Scalars['String'];
};

export type Sections = {
  __typename?: 'Sections';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  LRN: Scalars['String'];
  address?: Maybe<StudentAddress>;
  birthday?: Maybe<Scalars['String']>;
  contact_number?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  enrollment_records?: Maybe<Array<EnrolledRecords>>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  parent_guardians?: Maybe<Array<StudentParentGuardian>>;
  requirements?: Maybe<StudentRequirements>;
  school_records?: Maybe<StudentSchoolRecord>;
  transfer_records?: Maybe<Array<StudentTransferRecord>>;
};

export type StudentAddress = {
  __typename?: 'StudentAddress';
  barangay: Scalars['String'];
  city: Scalars['String'];
  id: Scalars['String'];
  no?: Maybe<Scalars['String']>;
  province: Scalars['String'];
  region: Scalars['String'];
  street?: Maybe<Scalars['String']>;
  subdiv?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type StudentParentGuardian = {
  __typename?: 'StudentParentGuardian';
  contact_number: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['String'];
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  student: Student;
  type: Scalars['String'];
};

export type StudentRequirements = {
  __typename?: 'StudentRequirements';
  has_baptismal: Scalars['Boolean'];
  has_form_137: Scalars['Boolean'];
  has_good_moral: Scalars['Boolean'];
  has_parent_marriage_contract: Scalars['Boolean'];
  has_psa: Scalars['Boolean'];
  has_report_card: Scalars['Boolean'];
  has_report_of_rating: Scalars['Boolean'];
  has_school_government_recognition: Scalars['Boolean'];
  id: Scalars['String'];
};

export type StudentSchoolRecord = {
  __typename?: 'StudentSchoolRecord';
  id: Scalars['String'];
  school_name: Scalars['String'];
  sy_graduated: Scalars['String'];
  type: Scalars['String'];
};

export type StudentTransferRecord = {
  __typename?: 'StudentTransferRecord';
  id: Scalars['String'];
  student: Student;
  sy_entered: Scalars['String'];
  sy_exit: Scalars['String'];
};

export type Employee_Auth_MutationMutationVariables = Exact<{
  input: LoginInput;
}>;


export type Employee_Auth_MutationMutation = { __typename?: 'Mutation', employee_auth: { __typename?: 'LoginReturn', token: string } };

export type Employee_Detail_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Employee_Detail_QueryQuery = { __typename?: 'Query', employee_detail: { __typename?: 'Employee', employee_id: string, id: string, role: string, profile?: { __typename?: 'EmployeeProfile', first_name: string, last_name: string, middle_name?: string | null } | null } };

export type Get_Global_Vars_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Global_Vars_QueryQuery = { __typename?: 'Query', get_globa_vars: { __typename?: 'GlobalVarsReturn', school_year: { __typename?: 'GlobalVars', title: string, value: string } } };

export type MeowQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeowQueryQuery = { __typename?: 'Query', meow: string };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', meow_but_need_token: string };


export const Employee_Auth_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"employee_auth_mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_auth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<Employee_Auth_MutationMutation, Employee_Auth_MutationMutationVariables>;
export const Employee_Detail_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"employee_detail_query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<Employee_Detail_QueryQuery, Employee_Detail_QueryQueryVariables>;
export const Get_Global_Vars_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"get_global_vars_query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get_globa_vars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"school_year"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<Get_Global_Vars_QueryQuery, Get_Global_Vars_QueryQueryVariables>;
export const MeowQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"meowQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meow"}}]}}]} as unknown as DocumentNode<MeowQueryQuery, MeowQueryQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meow_but_need_token"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;