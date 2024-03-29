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
  action_type: Scalars['String'];
  description: Scalars['String'];
  employee: Employee;
  id?: Maybe<Scalars['String']>;
  timestamp: Scalars['String'];
};

export type AuthInput = {
  EID: Scalars['String'];
  password: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  needNewPassword: Scalars['Boolean'];
  token: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  audit?: Maybe<Array<Maybe<AuditTrail>>>;
  employee_id: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  partial_password?: Maybe<Scalars['String']>;
  profile?: Maybe<EmployeeProfile>;
  role: Scalars['String'];
  status?: Maybe<Scalars['Int']>;
};

export type EmployeeInput = {
  employee_id: Scalars['String'];
  password: Scalars['String'];
  profile?: InputMaybe<EmployeeProfileInput>;
  role: Scalars['String'];
};

export type EmployeeProfile = {
  __typename?: 'EmployeeProfile';
  first_name: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
};

export type EmployeeProfileInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  middle_name?: InputMaybe<Scalars['String']>;
};

export type EnrolledRecord = {
  __typename?: 'EnrolledRecord';
  SID?: Maybe<Scalars['String']>;
  SY: Scalars['String'];
  grade_level_id: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  section_id: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
};

export type GlobalVars = {
  __typename?: 'GlobalVars';
  id?: Maybe<Scalars['String']>;
  identifier?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateSchoolYear?: Maybe<GlobalVars>;
  addEditSection?: Maybe<Section>;
  addEmployee?: Maybe<Employee>;
  addStudent?: Maybe<Student>;
  addStudents?: Maybe<Array<Maybe<Student>>>;
  auth?: Maybe<AuthResponse>;
  changeEmployeePassword?: Maybe<Employee>;
  changeMyPassword?: Maybe<Employee>;
  disableEmployee?: Maybe<Employee>;
  dropEnrollmentRecord?: Maybe<Array<Maybe<EnrolledRecord>>>;
  enableEmployee?: Maybe<Employee>;
  enrollStudent?: Maybe<Student>;
  logout?: Maybe<Scalars['Boolean']>;
  resetEmployeePassword?: Maybe<Employee>;
  toggleSectionStatus?: Maybe<Array<Maybe<Section>>>;
  updateStudentAcademicRecords?: Maybe<Student>;
  updateStudentAddressInfo?: Maybe<Student>;
  updateStudentBasicInfo?: Maybe<Student>;
  updateStudentEnrollmentInfo?: Maybe<EnrolledRecord>;
  updateStudentParentInfo?: Maybe<Student>;
  updateStudentRequirementInfo?: Maybe<Student>;
};


export type MutationActivateSchoolYearArgs = {
  SY: Scalars['String'];
};


export type MutationAddEditSectionArgs = {
  input: SectionInput;
};


export type MutationAddEmployeeArgs = {
  input: AddEmployeeInput;
};


export type MutationAddStudentArgs = {
  input: StudentInput;
};


export type MutationAddStudentsArgs = {
  input: Array<InputMaybe<StudentInput>>;
};


export type MutationAuthArgs = {
  input: AuthInput;
};


export type MutationChangeEmployeePasswordArgs = {
  employee_id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangeMyPasswordArgs = {
  password: Scalars['String'];
};


export type MutationDisableEmployeeArgs = {
  employee_id: Scalars['String'];
};


export type MutationDropEnrollmentRecordArgs = {
  input?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationEnableEmployeeArgs = {
  employee_id: Scalars['String'];
};


export type MutationEnrollStudentArgs = {
  input: EnrollStudentInput;
};


export type MutationResetEmployeePasswordArgs = {
  employee_id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationToggleSectionStatusArgs = {
  id: Scalars['String'];
};


export type MutationUpdateStudentAcademicRecordsArgs = {
  ID: Scalars['String'];
  input: Array<InputMaybe<StudentSchoolRecordInput>>;
};


export type MutationUpdateStudentAddressInfoArgs = {
  ID: Scalars['String'];
  input: StudentAddressInput;
};


export type MutationUpdateStudentBasicInfoArgs = {
  ID: Scalars['String'];
  input: UpdateStudentBasicInfoInput;
};


export type MutationUpdateStudentEnrollmentInfoArgs = {
  EID: Scalars['String'];
  input: UpdateStudentEnrollmentInfo;
};


export type MutationUpdateStudentParentInfoArgs = {
  ID: Scalars['String'];
  input: UpdateStudentParentInfo;
};


export type MutationUpdateStudentRequirementInfoArgs = {
  ID: Scalars['String'];
  input: StudentRequirementsInput;
};

export type Query = {
  __typename?: 'Query';
  checkUniqueLRN: Scalars['Boolean'];
  getAuditTrails: GetAuditTrailsResponse;
  getDashboardCardInfo?: Maybe<GetCardInfoResponse>;
  getEmployee?: Maybe<Employee>;
  getEmployees: GetEmployeesResponse;
  getEnrolledArchiveList?: Maybe<GetEnrolledListResponse>;
  getEnrolledList?: Maybe<GetEnrolledListResponse>;
  getEnrollmentRecord: EnrolledRecord;
  getGlobalVars?: Maybe<GetGlobalVarsResponse>;
  getMe?: Maybe<Employee>;
  getSchoolYears?: Maybe<Array<Maybe<GetSchoolYearsResponse>>>;
  getSections?: Maybe<Array<Maybe<Section>>>;
  getStudent?: Maybe<Student>;
  getStudentToEnrollList?: Maybe<Array<Maybe<Student>>>;
  getStudents?: Maybe<GetStudentsResponse>;
  getYearLevelSections?: Maybe<Array<Maybe<YearLevelSection>>>;
  meow?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['String']>;
  validateStudentIDs: ValidateStudentIDsResponse;
};


export type QueryCheckUniqueLrnArgs = {
  LRN: Scalars['String'];
  currentLRN?: InputMaybe<Scalars['String']>;
};


export type QueryGetAuditTrailsArgs = {
  filter?: InputMaybe<AuditTrailFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetEmployeeArgs = {
  employee_id: Scalars['String'];
};


export type QueryGetEmployeesArgs = {
  filter?: InputMaybe<EmployeesFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetEnrolledArchiveListArgs = {
  filter: FilterGetEnrolledArchiveList;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetEnrolledListArgs = {
  filter: FilterGetEnrolledList;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetEnrollmentRecordArgs = {
  EID: Scalars['String'];
};


export type QueryGetSectionsArgs = {
  yearLevel: Scalars['String'];
};


export type QueryGetStudentArgs = {
  SID: Scalars['String'];
};


export type QueryGetStudentToEnrollListArgs = {
  search: Scalars['String'];
};


export type QueryGetStudentsArgs = {
  filter: FilterGetStudents;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryValidateStudentIDsArgs = {
  LRNs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Section = {
  __typename?: 'Section';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: Scalars['Boolean'];
  year_level: Scalars['String'];
};

export type SectionInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  year_level: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  LRN: Scalars['String'];
  address?: Maybe<StudentAddress>;
  birthday?: Maybe<Scalars['String']>;
  contact_number?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  enrollment_records?: Maybe<Array<Maybe<EnrolledRecord>>>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  parent_guardians?: Maybe<Array<Maybe<StudentParentGuardian>>>;
  requirements?: Maybe<StudentRequirements>;
  school_records?: Maybe<Array<Maybe<StudentSchoolRecord>>>;
  status?: Maybe<Scalars['String']>;
  transfer_records?: Maybe<Array<Maybe<StudentTransferRecord>>>;
};

export type StudentAddress = {
  __typename?: 'StudentAddress';
  barangay: Scalars['String'];
  city: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  no?: Maybe<Scalars['String']>;
  province: Scalars['String'];
  region: Scalars['String'];
  street?: Maybe<Scalars['String']>;
  subdiv?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type StudentAddressInput = {
  barangay: Scalars['String'];
  city: Scalars['String'];
  no?: InputMaybe<Scalars['String']>;
  province: Scalars['String'];
  region: Scalars['String'];
  street?: InputMaybe<Scalars['String']>;
  subdiv?: InputMaybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type StudentInput = {
  LRN: Scalars['String'];
  address?: InputMaybe<StudentAddressInput>;
  birthday?: InputMaybe<Scalars['String']>;
  contact_number?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
  middle_name?: InputMaybe<Scalars['String']>;
  parent_guardians?: InputMaybe<Array<InputMaybe<StudentParentGuardianInput>>>;
  requirements?: InputMaybe<StudentRequirementsInput>;
  school_records?: InputMaybe<Array<InputMaybe<StudentSchoolRecordInput>>>;
};

export type StudentParentGuardian = {
  __typename?: 'StudentParentGuardian';
  contact_number?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  middle_name?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
  type: Scalars['String'];
};

export type StudentParentGuardianInput = {
  contact_number?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  middle_name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
};

export type StudentRequirementsInput = {
  has_baptismal: Scalars['Boolean'];
  has_form_137: Scalars['Boolean'];
  has_good_moral: Scalars['Boolean'];
  has_parent_marriage_contract: Scalars['Boolean'];
  has_psa: Scalars['Boolean'];
  has_report_card: Scalars['Boolean'];
  has_report_of_rating: Scalars['Boolean'];
  has_school_government_recognition: Scalars['Boolean'];
};

export type StudentSchoolRecord = {
  __typename?: 'StudentSchoolRecord';
  id?: Maybe<Scalars['String']>;
  school_name: Scalars['String'];
  sy_graduated: Scalars['String'];
  type: Scalars['String'];
};

export type StudentSchoolRecordInput = {
  id?: InputMaybe<Scalars['String']>;
  is_active: Scalars['Boolean'];
  school_name: Scalars['String'];
  sy_graduated: Scalars['String'];
  type: Scalars['String'];
};

export type StudentTransferRecord = {
  __typename?: 'StudentTransferRecord';
  id?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
  sy_entered?: Maybe<Scalars['String']>;
  sy_exit?: Maybe<Scalars['String']>;
};

export type AddEmployeeInput = {
  employee: EmployeeInput;
};

export type AuditTrailFilter = {
  type?: InputMaybe<Scalars['String']>;
};

export type EmployeesFilter = {
  status?: InputMaybe<Scalars['Int']>;
};

export type EnrollStudentInput = {
  id: Scalars['String'];
  section: Scalars['String'];
  year_level: Scalars['String'];
};

export type FilterGetEnrolledArchiveList = {
  school_year?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  section?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year_level?: InputMaybe<Scalars['String']>;
};

export type FilterGetEnrolledList = {
  search?: InputMaybe<Scalars['String']>;
  section?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  year_level?: InputMaybe<Scalars['String']>;
};

export type FilterGetStudents = {
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type GetAuditTrailsResponse = {
  __typename?: 'getAuditTrailsResponse';
  audit_trail?: Maybe<Array<Maybe<AuditTrail>>>;
  length?: Maybe<Scalars['Int']>;
};

export type GetCardInfoResponse = {
  __typename?: 'getCardInfoResponse';
  elem_count: Scalars['Int'];
  hs_count: Scalars['Int'];
  pre_elem_count: Scalars['Int'];
  shs_count: Scalars['Int'];
  total_count: Scalars['Int'];
};

export type GetEmployeesResponse = {
  __typename?: 'getEmployeesResponse';
  employees?: Maybe<Array<Maybe<Employee>>>;
  length?: Maybe<Scalars['Int']>;
};

export type GetEnrolledArchiveListFilter = {
  SY?: InputMaybe<Scalars['String']>;
};

export type GetEnrolledListResponse = {
  __typename?: 'getEnrolledListResponse';
  enrolledRecords?: Maybe<Array<Maybe<EnrolledRecord>>>;
  length?: Maybe<Scalars['Int']>;
};

export type GetGlobalVarsResponse = {
  __typename?: 'getGlobalVarsResponse';
  audit_trail_types: Array<Maybe<Scalars['String']>>;
  school_year: Scalars['String'];
};

export type GetSchoolYearsResponse = {
  __typename?: 'getSchoolYearsResponse';
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type GetStudentsResponse = {
  __typename?: 'getStudentsResponse';
  length?: Maybe<Scalars['Int']>;
  students?: Maybe<Array<Maybe<Student>>>;
};

export type UpdateStudentBasicInfoInput = {
  LRN: Scalars['String'];
  birthday: Scalars['String'];
  contact_number: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  middle_name: Scalars['String'];
};

export type UpdateStudentEnrollmentInfo = {
  section_id: Scalars['String'];
  status: Scalars['String'];
};

export type UpdateStudentParentInfo = {
  father?: InputMaybe<StudentParentGuardianInput>;
  guardian?: InputMaybe<StudentParentGuardianInput>;
  mother?: InputMaybe<StudentParentGuardianInput>;
};

export type ValidateStudentIDsResponse = {
  __typename?: 'validateStudentIDsResponse';
  LRNs?: Maybe<Array<Maybe<Scalars['String']>>>;
  isValid: Scalars['Boolean'];
  message: Scalars['String'];
};

export type YearLevelSection = {
  __typename?: 'yearLevelSection';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sections?: Maybe<Array<Maybe<Section>>>;
  value: Scalars['String'];
};

export type EmployeeFragment = { __typename?: 'Employee', employee_id: string, id?: string | null, partial_password?: string | null, role: string, status?: number | null, profile?: { __typename?: 'EmployeeProfile', first_name: string, id?: string | null, middle_name?: string | null, last_name: string } | null } & { ' $fragmentName'?: 'EmployeeFragment' };

export type EnrolledRecordFragment = { __typename?: 'EnrolledRecord', SY: string, grade_level_id: string, id?: string | null, SID?: string | null, status?: string | null, section_id: string, student?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null } & { ' $fragmentName'?: 'EnrolledRecordFragment' };

export type StudentFragment = { __typename?: 'Student', id?: string | null, LRN: string, first_name: string, middle_name?: string | null, last_name: string, gender: string, birthday?: string | null, contact_number?: string | null, email?: string | null, status?: string | null, enrollment_records?: Array<{ __typename?: 'EnrolledRecord', id?: string | null, SY: string, SID?: string | null, grade_level_id: string, section_id: string, status?: string | null } | null> | null, address?: { __typename?: 'StudentAddress', id?: string | null, no?: string | null, street?: string | null, subdiv?: string | null, barangay: string, city: string, province: string, region: string, zip: string } | null, parent_guardians?: Array<{ __typename?: 'StudentParentGuardian', id?: string | null, first_name: string, middle_name?: string | null, last_name: string, contact_number?: string | null, email: string, type: string } | null> | null, requirements?: { __typename?: 'StudentRequirements', id?: string | null, has_form_137: boolean, has_psa: boolean, has_parent_marriage_contract: boolean, has_report_card: boolean, has_report_of_rating: boolean, has_good_moral: boolean, has_school_government_recognition: boolean, has_baptismal: boolean } | null, school_records?: Array<{ __typename?: 'StudentSchoolRecord', id?: string | null, sy_graduated: string, school_name: string, type: string } | null> | null, transfer_records?: Array<{ __typename?: 'StudentTransferRecord', id?: string | null, sy_entered?: string | null, sy_exit?: string | null } | null> | null } & { ' $fragmentName'?: 'StudentFragment' };

export type ActivateSchoolYearMutationVariables = Exact<{
  sy: Scalars['String'];
}>;


export type ActivateSchoolYearMutation = { __typename?: 'Mutation', activateSchoolYear?: { __typename?: 'GlobalVars', identifier?: string | null, value?: string | null } | null };

export type AddEditSectionMutationVariables = Exact<{
  input: SectionInput;
}>;


export type AddEditSectionMutation = { __typename?: 'Mutation', addEditSection?: { __typename?: 'Section', year_level: string, name: string, id?: string | null } | null };

export type AddEmployeeMutationVariables = Exact<{
  input: AddEmployeeInput;
}>;


export type AddEmployeeMutation = { __typename?: 'Mutation', addEmployee?: (
    { __typename?: 'Employee' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) | null };

export type AddStudentMutationVariables = Exact<{
  input: StudentInput;
}>;


export type AddStudentMutation = { __typename?: 'Mutation', addStudent?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type AddStudentsMutationVariables = Exact<{
  input: Array<InputMaybe<StudentInput>> | InputMaybe<StudentInput>;
}>;


export type AddStudentsMutation = { __typename?: 'Mutation', addStudents?: Array<(
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null> | null };

export type AuthMutationMutationVariables = Exact<{
  input: AuthInput;
}>;


export type AuthMutationMutation = { __typename?: 'Mutation', auth?: { __typename?: 'AuthResponse', needNewPassword: boolean, token: string } | null };

export type ChangeEmployeePasswordMutationVariables = Exact<{
  employeeId: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangeEmployeePasswordMutation = { __typename?: 'Mutation', changeEmployeePassword?: { __typename?: 'Employee', employee_id: string } | null };

export type EnableEmployeeMutationVariables = Exact<{
  employeeId: Scalars['String'];
}>;


export type EnableEmployeeMutation = { __typename?: 'Mutation', enableEmployee?: (
    { __typename?: 'Employee' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) | null };

export type DropEnrollmentRecordMutationVariables = Exact<{
  input?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type DropEnrollmentRecordMutation = { __typename?: 'Mutation', dropEnrollmentRecord?: Array<(
    { __typename?: 'EnrolledRecord' }
    & { ' $fragmentRefs'?: { 'EnrolledRecordFragment': EnrolledRecordFragment } }
  ) | null> | null };

export type DisableEmployeeMutationVariables = Exact<{
  employeeId: Scalars['String'];
}>;


export type DisableEmployeeMutation = { __typename?: 'Mutation', disableEmployee?: (
    { __typename?: 'Employee' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) | null };

export type EnrollStudentMutationVariables = Exact<{
  input: EnrollStudentInput;
}>;


export type EnrollStudentMutation = { __typename?: 'Mutation', enrollStudent?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type ResetEmployeePasswordMutationVariables = Exact<{
  employeeId: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetEmployeePasswordMutation = { __typename?: 'Mutation', resetEmployeePassword?: (
    { __typename?: 'Employee' }
    & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
  ) | null };

export type ToggleSectionStatusMutationVariables = Exact<{
  deleteSectionId: Scalars['String'];
}>;


export type ToggleSectionStatusMutation = { __typename?: 'Mutation', toggleSectionStatus?: Array<{ __typename?: 'Section', id?: string | null, name: string, year_level: string, status: boolean } | null> | null };

export type UpdateStudentAcademicRecordsMutationVariables = Exact<{
  input: Array<InputMaybe<StudentSchoolRecordInput>> | InputMaybe<StudentSchoolRecordInput>;
  id: Scalars['String'];
}>;


export type UpdateStudentAcademicRecordsMutation = { __typename?: 'Mutation', updateStudentAcademicRecords?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type UpdateStudentAddressInfoMutationVariables = Exact<{
  input: StudentAddressInput;
  id: Scalars['String'];
}>;


export type UpdateStudentAddressInfoMutation = { __typename?: 'Mutation', updateStudentAddressInfo?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type UpdateStudentBasicInfoMutationVariables = Exact<{
  input: UpdateStudentBasicInfoInput;
  id: Scalars['String'];
}>;


export type UpdateStudentBasicInfoMutation = { __typename?: 'Mutation', updateStudentBasicInfo?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type UpdateStudentEnrollmentInfoMutationVariables = Exact<{
  input: UpdateStudentEnrollmentInfo;
  eid: Scalars['String'];
}>;


export type UpdateStudentEnrollmentInfoMutation = { __typename?: 'Mutation', updateStudentEnrollmentInfo?: (
    { __typename?: 'EnrolledRecord' }
    & { ' $fragmentRefs'?: { 'EnrolledRecordFragment': EnrolledRecordFragment } }
  ) | null };

export type UpdateStudentParentInfoMutationVariables = Exact<{
  input: UpdateStudentParentInfo;
  id: Scalars['String'];
}>;


export type UpdateStudentParentInfoMutation = { __typename?: 'Mutation', updateStudentParentInfo?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type UpdateStudentRequirementInfoMutationVariables = Exact<{
  input: StudentRequirementsInput;
  id: Scalars['String'];
}>;


export type UpdateStudentRequirementInfoMutation = { __typename?: 'Mutation', updateStudentRequirementInfo?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type CheckUniqueLrnQueryVariables = Exact<{
  lrn: Scalars['String'];
  currentLrn?: InputMaybe<Scalars['String']>;
}>;


export type CheckUniqueLrnQuery = { __typename?: 'Query', checkUniqueLRN: boolean };

export type GetAuditTrailsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<AuditTrailFilter>;
}>;


export type GetAuditTrailsQuery = { __typename?: 'Query', getAuditTrails: { __typename?: 'getAuditTrailsResponse', length?: number | null, audit_trail?: Array<{ __typename?: 'AuditTrail', action_type: string, description: string, timestamp: string, id?: string | null, employee: (
        { __typename?: 'Employee' }
        & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
      ) } | null> | null } };

export type GetDashboardCardInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardCardInfoQuery = { __typename?: 'Query', getDashboardCardInfo?: { __typename?: 'getCardInfoResponse', elem_count: number, pre_elem_count: number, hs_count: number, shs_count: number, total_count: number } | null };

export type GetEmployeesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EmployeesFilter>;
}>;


export type GetEmployeesQuery = { __typename?: 'Query', getEmployees: { __typename?: 'getEmployeesResponse', length?: number | null, employees?: Array<(
      { __typename?: 'Employee' }
      & { ' $fragmentRefs'?: { 'EmployeeFragment': EmployeeFragment } }
    ) | null> | null } };

export type GetEnrolledArchiveListQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  filter: FilterGetEnrolledArchiveList;
}>;


export type GetEnrolledArchiveListQuery = { __typename?: 'Query', getEnrolledArchiveList?: { __typename?: 'getEnrolledListResponse', length?: number | null, enrolledRecords?: Array<(
      { __typename?: 'EnrolledRecord' }
      & { ' $fragmentRefs'?: { 'EnrolledRecordFragment': EnrolledRecordFragment } }
    ) | null> | null } | null };

export type GetEnrolledListQueryVariables = Exact<{
  filter: FilterGetEnrolledList;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetEnrolledListQuery = { __typename?: 'Query', getEnrolledList?: { __typename?: 'getEnrolledListResponse', length?: number | null, enrolledRecords?: Array<(
      { __typename?: 'EnrolledRecord' }
      & { ' $fragmentRefs'?: { 'EnrolledRecordFragment': EnrolledRecordFragment } }
    ) | null> | null } | null };

export type GetEnrollmentRecordQueryVariables = Exact<{
  eid: Scalars['String'];
}>;


export type GetEnrollmentRecordQuery = { __typename?: 'Query', getEnrollmentRecord: (
    { __typename?: 'EnrolledRecord' }
    & { ' $fragmentRefs'?: { 'EnrolledRecordFragment': EnrolledRecordFragment } }
  ) };

export type GetGlobalVarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalVarsQuery = { __typename?: 'Query', getGlobalVars?: { __typename?: 'getGlobalVarsResponse', audit_trail_types: Array<string | null>, school_year: string } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'Employee', employee_id: string, id?: string | null, partial_password?: string | null, role: string, profile?: { __typename?: 'EmployeeProfile', first_name: string, last_name: string, middle_name?: string | null } | null } | null };

export type GetSchoolYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolYearsQuery = { __typename?: 'Query', getSchoolYears?: Array<{ __typename?: 'getSchoolYearsResponse', name: string, isActive: boolean } | null> | null };

export type GetStudentQueryVariables = Exact<{
  sid: Scalars['String'];
}>;


export type GetStudentQuery = { __typename?: 'Query', getStudent?: (
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null };

export type GetStudentToEnrollListQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetStudentToEnrollListQuery = { __typename?: 'Query', getStudentToEnrollList?: Array<(
    { __typename?: 'Student' }
    & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
  ) | null> | null };

export type GetStudentsQueryVariables = Exact<{
  filter: FilterGetStudents;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetStudentsQuery = { __typename?: 'Query', getStudents?: { __typename?: 'getStudentsResponse', length?: number | null, students?: Array<(
      { __typename?: 'Student' }
      & { ' $fragmentRefs'?: { 'StudentFragment': StudentFragment } }
    ) | null> | null } | null };

export type GetYearLevelSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetYearLevelSectionsQuery = { __typename?: 'Query', getYearLevelSections?: Array<{ __typename?: 'yearLevelSection', id?: string | null, name: string, value: string, sections?: Array<{ __typename?: 'Section', id?: string | null, name: string, year_level: string, status: boolean } | null> | null } | null> | null };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', meow?: string | null };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', test?: string | null };

export type ValidateStudentIDsQueryVariables = Exact<{
  lrNs?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type ValidateStudentIDsQuery = { __typename?: 'Query', validateStudentIDs: { __typename?: 'validateStudentIDsResponse', LRNs?: Array<string | null> | null, isValid: boolean, message: string } };

export const EmployeeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Employee"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Employee"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"partial_password"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]} as unknown as DocumentNode<EmployeeFragment, unknown>;
export const StudentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Student"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Student"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"LRN"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"contact_number"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"enrollment_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"SY"}},{"kind":"Field","name":{"kind":"Name","value":"SID"}},{"kind":"Field","name":{"kind":"Name","value":"grade_level_id"}},{"kind":"Field","name":{"kind":"Name","value":"section_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"subdiv"}},{"kind":"Field","name":{"kind":"Name","value":"barangay"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent_guardians"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"contact_number"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requirements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"has_form_137"}},{"kind":"Field","name":{"kind":"Name","value":"has_psa"}},{"kind":"Field","name":{"kind":"Name","value":"has_parent_marriage_contract"}},{"kind":"Field","name":{"kind":"Name","value":"has_report_card"}},{"kind":"Field","name":{"kind":"Name","value":"has_report_of_rating"}},{"kind":"Field","name":{"kind":"Name","value":"has_good_moral"}},{"kind":"Field","name":{"kind":"Name","value":"has_school_government_recognition"}},{"kind":"Field","name":{"kind":"Name","value":"has_baptismal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sy_graduated"}},{"kind":"Field","name":{"kind":"Name","value":"school_name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transfer_records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sy_entered"}},{"kind":"Field","name":{"kind":"Name","value":"sy_exit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<StudentFragment, unknown>;
export const EnrolledRecordFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EnrolledRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EnrolledRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SY"}},{"kind":"Field","name":{"kind":"Name","value":"grade_level_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"SID"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"section_id"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<EnrolledRecordFragment, unknown>;
export const ActivateSchoolYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateSchoolYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateSchoolYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"SY"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ActivateSchoolYearMutation, ActivateSchoolYearMutationVariables>;
export const AddEditSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEditSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEditSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year_level"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddEditSectionMutation, AddEditSectionMutationVariables>;
export const AddEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"addEmployeeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<AddEmployeeMutation, AddEmployeeMutationVariables>;
export const AddStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<AddStudentMutation, AddStudentMutationVariables>;
export const AddStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<AddStudentsMutation, AddStudentsMutationVariables>;
export const AuthMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"needNewPassword"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<AuthMutationMutation, AuthMutationMutationVariables>;
export const ChangeEmployeePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeEmployeePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmployeePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employee_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_id"}}]}}]}}]} as unknown as DocumentNode<ChangeEmployeePasswordMutation, ChangeEmployeePasswordMutationVariables>;
export const EnableEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employee_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<EnableEmployeeMutation, EnableEmployeeMutationVariables>;
export const DropEnrollmentRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DropEnrollmentRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dropEnrollmentRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EnrolledRecord"}}]}}]}},...EnrolledRecordFragmentDoc.definitions]} as unknown as DocumentNode<DropEnrollmentRecordMutation, DropEnrollmentRecordMutationVariables>;
export const DisableEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employee_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<DisableEmployeeMutation, DisableEmployeeMutationVariables>;
export const EnrollStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"enrollStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"enrollStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrollStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<EnrollStudentMutation, EnrollStudentMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ResetEmployeePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetEmployeePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetEmployeePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"employee_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"employeeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<ResetEmployeePasswordMutation, ResetEmployeePasswordMutationVariables>;
export const ToggleSectionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleSectionStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteSectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleSectionStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteSectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year_level"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ToggleSectionStatusMutation, ToggleSectionStatusMutationVariables>;
export const UpdateStudentAcademicRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentAcademicRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentSchoolRecordInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentAcademicRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentAcademicRecordsMutation, UpdateStudentAcademicRecordsMutationVariables>;
export const UpdateStudentAddressInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentAddressInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentAddressInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentAddressInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentAddressInfoMutation, UpdateStudentAddressInfoMutationVariables>;
export const UpdateStudentBasicInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentBasicInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateStudentBasicInfoInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentBasicInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentBasicInfoMutation, UpdateStudentBasicInfoMutationVariables>;
export const UpdateStudentEnrollmentInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentEnrollmentInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateStudentEnrollmentInfo"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentEnrollmentInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"EID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EnrolledRecord"}}]}}]}},...EnrolledRecordFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentEnrollmentInfoMutation, UpdateStudentEnrollmentInfoMutationVariables>;
export const UpdateStudentParentInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentParentInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateStudentParentInfo"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentParentInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentParentInfoMutation, UpdateStudentParentInfoMutationVariables>;
export const UpdateStudentRequirementInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStudentRequirementInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentRequirementsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudentRequirementInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<UpdateStudentRequirementInfoMutation, UpdateStudentRequirementInfoMutationVariables>;
export const CheckUniqueLrnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkUniqueLRN"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lrn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentLrn"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUniqueLRN"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LRN"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lrn"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentLRN"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentLrn"}}}]}]}}]} as unknown as DocumentNode<CheckUniqueLrnQuery, CheckUniqueLrnQueryVariables>;
export const GetAuditTrailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAuditTrails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"auditTrailFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuditTrails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"audit_trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action_type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<GetAuditTrailsQuery, GetAuditTrailsQueryVariables>;
export const GetDashboardCardInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDashboardCardInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDashboardCardInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elem_count"}},{"kind":"Field","name":{"kind":"Name","value":"pre_elem_count"}},{"kind":"Field","name":{"kind":"Name","value":"hs_count"}},{"kind":"Field","name":{"kind":"Name","value":"shs_count"}},{"kind":"Field","name":{"kind":"Name","value":"total_count"}}]}}]}}]} as unknown as DocumentNode<GetDashboardCardInfoQuery, GetDashboardCardInfoQueryVariables>;
export const GetEmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEmployees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"employeesFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEmployees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Employee"}}]}}]}}]}},...EmployeeFragmentDoc.definitions]} as unknown as DocumentNode<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const GetEnrolledArchiveListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEnrolledArchiveList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"filterGetEnrolledArchiveList"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEnrolledArchiveList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EnrolledRecord"}}]}}]}}]}},...EnrolledRecordFragmentDoc.definitions]} as unknown as DocumentNode<GetEnrolledArchiveListQuery, GetEnrolledArchiveListQueryVariables>;
export const GetEnrolledListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrolledList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"filterGetEnrolledList"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEnrolledList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"enrolledRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EnrolledRecord"}}]}}]}}]}},...EnrolledRecordFragmentDoc.definitions]} as unknown as DocumentNode<GetEnrolledListQuery, GetEnrolledListQueryVariables>;
export const GetEnrollmentRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEnrollmentRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEnrollmentRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"EID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EnrolledRecord"}}]}}]}},...EnrolledRecordFragmentDoc.definitions]} as unknown as DocumentNode<GetEnrollmentRecordQuery, GetEnrollmentRecordQueryVariables>;
export const GetGlobalVarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGlobalVars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGlobalVars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audit_trail_types"}},{"kind":"Field","name":{"kind":"Name","value":"school_year"}}]}}]}}]} as unknown as DocumentNode<GetGlobalVarsQuery, GetGlobalVarsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employee_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"partial_password"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"middle_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetSchoolYearsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSchoolYears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSchoolYears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<GetSchoolYearsQuery, GetSchoolYearsQueryVariables>;
export const GetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"SID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<GetStudentQuery, GetStudentQueryVariables>;
export const GetStudentToEnrollListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentToEnrollList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudentToEnrollList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<GetStudentToEnrollListQuery, GetStudentToEnrollListQueryVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"filterGetStudents"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Student"}}]}}]}}]}},...StudentFragmentDoc.definitions]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetYearLevelSectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getYearLevelSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getYearLevelSections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year_level"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<GetYearLevelSectionsQuery, GetYearLevelSectionsQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meow"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const ValidateStudentIDsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateStudentIDs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lrNs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateStudentIDs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LRNs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lrNs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LRNs"}},{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ValidateStudentIDsQuery, ValidateStudentIDsQueryVariables>;