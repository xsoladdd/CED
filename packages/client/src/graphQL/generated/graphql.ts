/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuditTrail = {
  __typename?: "AuditTrail";
  action_type: Scalars["String"];
  description: Scalars["String"];
  employee: Employee;
  id?: Maybe<Scalars["String"]>;
  timestamp: Scalars["String"];
};

export type AuthInput = {
  EID: Scalars["String"];
  password: Scalars["String"];
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  needNewPassword: Scalars["Boolean"];
  token: Scalars["String"];
};

export type Employee = {
  __typename?: "Employee";
  audit?: Maybe<Array<Maybe<AuditTrail>>>;
  employee_id: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  partial_password?: Maybe<Scalars["String"]>;
  profile?: Maybe<EmployeeProfile>;
  role: Scalars["String"];
  status?: Maybe<Scalars["Int"]>;
};

export type EmployeeInput = {
  employee_id: Scalars["String"];
  password: Scalars["String"];
  profile?: InputMaybe<EmployeeProfileInput>;
  role: Scalars["String"];
};

export type EmployeeProfile = {
  __typename?: "EmployeeProfile";
  first_name: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  last_name: Scalars["String"];
  middle_name?: Maybe<Scalars["String"]>;
};

export type EmployeeProfileInput = {
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  middle_name?: InputMaybe<Scalars["String"]>;
};

export type EnrolledRecords = {
  __typename?: "EnrolledRecords";
  SY: Scalars["String"];
  grade_level_id: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  payment_status: Scalars["String"];
  section_id: Scalars["String"];
  student?: Maybe<Student>;
};

export type GlobalVars = {
  __typename?: "GlobalVars";
  id?: Maybe<Scalars["String"]>;
  identifier?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addEmployee?: Maybe<Employee>;
  auth?: Maybe<AuthResponse>;
  changeEmployeePassword?: Maybe<Employee>;
  changeMyPassword?: Maybe<Employee>;
  disableEmployee?: Maybe<Scalars["String"]>;
  enableEmployee?: Maybe<Scalars["String"]>;
  resetEmployeePassword?: Maybe<Employee>;
};

export type MutationAddEmployeeArgs = {
  input: AddEmployeeInput;
};

export type MutationAuthArgs = {
  input: AuthInput;
};

export type MutationChangeEmployeePasswordArgs = {
  employee_id: Scalars["String"];
  password: Scalars["String"];
};

export type MutationChangeMyPasswordArgs = {
  password: Scalars["String"];
};

export type MutationDisableEmployeeArgs = {
  employee_id: Scalars["String"];
};

export type MutationEnableEmployeeArgs = {
  employee_id: Scalars["String"];
};

export type MutationResetEmployeePasswordArgs = {
  employee_id: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getAuditTrails?: Maybe<Array<Maybe<AuditTrail>>>;
  getEmployee?: Maybe<Employee>;
  getEmployees?: Maybe<Array<Maybe<Employee>>>;
  getGlobalVars?: Maybe<GetGlobalVarsResponse>;
  getMe?: Maybe<Employee>;
  getStudent?: Maybe<Student>;
  getStudents?: Maybe<Array<Maybe<Student>>>;
  meow?: Maybe<Scalars["String"]>;
};

export type QueryGetAuditTrailsArgs = {
  filter?: InputMaybe<AuditTrailFilter>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type QueryGetEmployeeArgs = {
  employee_id: Scalars["String"];
};

export type QueryGetEmployeesArgs = {
  filter?: InputMaybe<EmployeesFilter>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type QueryGetStudentArgs = {
  LRN: Scalars["String"];
};

export type QueryGetStudentsArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type Section = {
  __typename?: "Section";
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  year_level: Scalars["String"];
};

export type Student = {
  __typename?: "Student";
  LRN: Scalars["String"];
  address?: Maybe<StudentAddress>;
  birthday?: Maybe<Scalars["String"]>;
  contact_number?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  enrollment_records?: Maybe<Array<Maybe<EnrolledRecords>>>;
  first_name: Scalars["String"];
  gender: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  last_name: Scalars["String"];
  middle_name?: Maybe<Scalars["String"]>;
  parent_guardians?: Maybe<Array<Maybe<StudentParentGuardian>>>;
  requirements?: Maybe<StudentRequirements>;
  school_records?: Maybe<StudentSchoolRecord>;
  transfer_records?: Maybe<Array<Maybe<StudentTransferRecord>>>;
};

export type StudentAddress = {
  __typename?: "StudentAddress";
  barangay: Scalars["String"];
  city: Scalars["String"];
  id: Scalars["String"];
  no?: Maybe<Scalars["String"]>;
  province: Scalars["String"];
  region: Scalars["String"];
  street?: Maybe<Scalars["String"]>;
  subdiv?: Maybe<Scalars["String"]>;
  zip: Scalars["String"];
};

export type StudentParentGuardian = {
  __typename?: "StudentParentGuardian";
  contact_number?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  last_name: Scalars["String"];
  middle_name?: Maybe<Scalars["String"]>;
  student?: Maybe<Student>;
  type: Scalars["String"];
};

export type StudentRequirements = {
  __typename?: "StudentRequirements";
  has_baptismal: Scalars["Boolean"];
  has_form_137: Scalars["Boolean"];
  has_good_moral: Scalars["Boolean"];
  has_parent_marriage_contract: Scalars["Boolean"];
  has_psa: Scalars["Boolean"];
  has_report_card: Scalars["Boolean"];
  has_report_of_rating: Scalars["Boolean"];
  has_school_government_recognition: Scalars["Boolean"];
  id?: Maybe<Scalars["String"]>;
};

export type StudentSchoolRecord = {
  __typename?: "StudentSchoolRecord";
  id: Scalars["String"];
  school_name: Scalars["String"];
  sy_graduated: Scalars["String"];
  type: Scalars["String"];
};

export type StudentTransferRecord = {
  __typename?: "StudentTransferRecord";
  id?: Maybe<Scalars["String"]>;
  student?: Maybe<Student>;
  sy_entered?: Maybe<Scalars["String"]>;
  sy_exit?: Maybe<Scalars["String"]>;
};

export type AddEmployeeInput = {
  employee: EmployeeInput;
};

export type AuditTrailFilter = {
  type?: InputMaybe<Scalars["String"]>;
};

export type EmployeesFilter = {
  status?: InputMaybe<Scalars["Int"]>;
};

export type GetGlobalVarsResponse = {
  __typename?: "getGlobalVarsResponse";
  audit_trail_types: Array<Maybe<Scalars["String"]>>;
  school_year: Scalars["String"];
};

export type AuthMutationMutationVariables = Exact<{
  input: AuthInput;
}>;

export type AuthMutationMutation = {
  __typename?: "Mutation";
  auth?: {
    __typename?: "AuthResponse";
    needNewPassword: boolean;
    token: string;
  } | null;
};

export type DisableEmployeeMutationVariables = Exact<{
  employeeId: Scalars["String"];
}>;

export type DisableEmployeeMutation = {
  __typename?: "Mutation";
  disableEmployee?: string | null;
};

export type EnableEmployeeMutationVariables = Exact<{
  employeeId: Scalars["String"];
}>;

export type EnableEmployeeMutation = {
  __typename?: "Mutation";
  enableEmployee?: string | null;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  __typename?: "Query";
  getMe?: {
    __typename?: "Employee";
    employee_id: string;
    id?: string | null;
    role: string;
    profile?: {
      __typename?: "EmployeeProfile";
      first_name: string;
      last_name: string;
      middle_name?: string | null;
    } | null;
  } | null;
};

export type GetAuditTrailsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  filter?: InputMaybe<AuditTrailFilter>;
}>;

export type GetAuditTrailsQuery = {
  __typename?: "Query";
  getAuditTrails?: Array<{
    __typename?: "AuditTrail";
    action_type: string;
    description: string;
    timestamp: string;
    id?: string | null;
    employee: {
      __typename?: "Employee";
      employee_id: string;
      role: string;
      profile?: {
        __typename?: "EmployeeProfile";
        first_name: string;
        last_name: string;
      } | null;
    };
  } | null> | null;
};

export type GetEmployeesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  filter?: InputMaybe<EmployeesFilter>;
}>;

export type GetEmployeesQuery = {
  __typename?: "Query";
  getEmployees?: Array<{
    __typename?: "Employee";
    employee_id: string;
    id?: string | null;
    partial_password?: string | null;
    role: string;
    status?: number | null;
    profile?: {
      __typename?: "EmployeeProfile";
      first_name: string;
      id?: string | null;
      middle_name?: string | null;
      last_name: string;
    } | null;
  } | null> | null;
};

export type GetGlobalVarsQueryVariables = Exact<{ [key: string]: never }>;

export type GetGlobalVarsQuery = {
  __typename?: "Query";
  getGlobalVars?: {
    __typename?: "getGlobalVarsResponse";
    audit_trail_types: Array<string | null>;
    school_year: string;
  } | null;
};

export type PingQueryVariables = Exact<{ [key: string]: never }>;

export type PingQuery = { __typename?: "Query"; meow?: string | null };

export const AuthMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "authMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AuthInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "auth" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "needNewPassword" },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AuthMutationMutation,
  AuthMutationMutationVariables
>;
export const DisableEmployeeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "disableEmployee" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "employeeId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "disableEmployee" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "employee_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "employeeId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DisableEmployeeMutation,
  DisableEmployeeMutationVariables
>;
export const EnableEmployeeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "enableEmployee" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "employeeId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "enableEmployee" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "employee_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "employeeId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EnableEmployeeMutation,
  EnableEmployeeMutationVariables
>;
export const GetMeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMe" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getMe" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "employee_id" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "first_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "last_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "middle_name" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetAuditTrailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAuditTrails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "auditTrailFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAuditTrails" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "action_type" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "employee" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "employee_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profile" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "first_name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "last_name" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuditTrailsQuery, GetAuditTrailsQueryVariables>;
export const GetEmployeesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getEmployees" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "employeesFilter" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getEmployees" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "employee_id" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "partial_password" },
                },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "first_name" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "middle_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "last_name" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const GetGlobalVarsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getGlobalVars" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getGlobalVars" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "audit_trail_types" },
                },
                { kind: "Field", name: { kind: "Name", value: "school_year" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGlobalVarsQuery, GetGlobalVarsQueryVariables>;
export const PingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Ping" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "meow" } }],
      },
    },
  ],
} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
