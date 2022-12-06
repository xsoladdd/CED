/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "fragment Employee on Employee {\n  employee_id\n  id\n  partial_password\n  role\n  status\n  profile {\n    first_name\n    id\n    middle_name\n    last_name\n  }\n}": types.EmployeeFragmentDoc,
    "fragment EnrolledRecord on EnrolledRecord {\n  SY\n  grade_level_id\n  id\n  SID\n  status\n  section_id\n  student {\n    ...Student\n  }\n}": types.EnrolledRecordFragmentDoc,
    "fragment Student on Student {\n  id\n  LRN\n  first_name\n  middle_name\n  last_name\n  gender\n  birthday\n  contact_number\n  email\n  enrollment_records {\n    id\n    SY\n    SID\n    grade_level_id\n    section_id\n    status\n  }\n  address {\n    id\n    no\n    street\n    subdiv\n    barangay\n    city\n    province\n    region\n    zip\n  }\n  parent_guardians {\n    id\n    first_name\n    middle_name\n    last_name\n    contact_number\n    email\n    type\n  }\n  requirements {\n    id\n    has_form_137\n    has_psa\n    has_parent_marriage_contract\n    has_report_card\n    has_report_of_rating\n    has_good_moral\n    has_school_government_recognition\n    has_baptismal\n  }\n  school_records {\n    id\n    sy_graduated\n    school_name\n    type\n  }\n  transfer_records {\n    id\n    sy_entered\n    sy_exit\n  }\n  status\n}": types.StudentFragmentDoc,
    "mutation ActivateSchoolYear($sy: String!) {\n  activateSchoolYear(SY: $sy) {\n    identifier\n    value\n  }\n}": types.ActivateSchoolYearDocument,
    "mutation addEditSection($input: SectionInput!) {\n  addEditSection(input: $input) {\n    year_level\n    name\n    id\n  }\n}": types.AddEditSectionDocument,
    "mutation addEmployee($input: addEmployeeInput!) {\n  addEmployee(input: $input) {\n    ...Employee\n  }\n}": types.AddEmployeeDocument,
    "mutation addStudent($input: StudentInput!) {\n  addStudent(input: $input) {\n    ...Student\n  }\n}": types.AddStudentDocument,
    "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}": types.AuthMutationDocument,
    "mutation EnableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}": types.EnableEmployeeDocument,
    "mutation DropEnrollmentRecord($input: [String]) {\n  dropEnrollmentRecord(input: $input) {\n    ...EnrolledRecord\n  }\n}": types.DropEnrollmentRecordDocument,
    "mutation DisableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}": types.DisableEmployeeDocument,
    "mutation ToggleSectionStatus($deleteSectionId: String!) {\n  toggleSectionStatus(id: $deleteSectionId) {\n    id\n    name\n    year_level\n    status\n  }\n}": types.ToggleSectionStatusDocument,
    "mutation updateStudentAcademicRecords($input: [StudentSchoolRecordInput]!, $id: String!) {\n  updateStudentAcademicRecords(input: $input, ID: $id) {\n    ...Student\n  }\n}": types.UpdateStudentAcademicRecordsDocument,
    "mutation updateStudentAddressInfo($input: StudentAddressInput!, $id: String!) {\n  updateStudentAddressInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}": types.UpdateStudentAddressInfoDocument,
    "mutation updateStudentBasicInfo($input: updateStudentBasicInfoInput!, $id: String!) {\n  updateStudentBasicInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}": types.UpdateStudentBasicInfoDocument,
    "mutation updateStudentEnrollmentInfo($input: updateStudentEnrollmentInfo!, $eid: String!) {\n  updateStudentEnrollmentInfo(input: $input, EID: $eid) {\n    ...EnrolledRecord\n  }\n}": types.UpdateStudentEnrollmentInfoDocument,
    "mutation updateStudentParentInfo($input: updateStudentParentInfo!, $id: String!) {\n  updateStudentParentInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}": types.UpdateStudentParentInfoDocument,
    "mutation updateStudentRequirementInfo($input: StudentRequirementsInput!, $id: String!) {\n  updateStudentRequirementInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}": types.UpdateStudentRequirementInfoDocument,
    "query checkUniqueLRN($lrn: String!, $currentLrn: String) {\n  checkUniqueLRN(LRN: $lrn, currentLRN: $currentLrn)\n}": types.CheckUniqueLrnDocument,
    "query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    length\n    audit_trail {\n      action_type\n      description\n      employee {\n        ...Employee\n      }\n      timestamp\n      id\n    }\n  }\n}": types.GetAuditTrailsDocument,
    "query getDashboardCardInfo {\n  getDashboardCardInfo {\n    elem_count\n    pre_elem_count\n    hs_count\n    shs_count\n    total_count\n  }\n}": types.GetDashboardCardInfoDocument,
    "query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    length\n    employees {\n      ...Employee\n    }\n  }\n}": types.GetEmployeesDocument,
    "query GetEnrolledArchiveList($limit: Int!, $offset: Int!, $filter: getEnrolledArchiveListFilter!) {\n  getEnrolledArchiveList(limit: $limit, offset: $offset, filter: $filter) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}": types.GetEnrolledArchiveListDocument,
    "query getEnrolledList($limit: Int, $offset: Int) {\n  getEnrolledList(limit: $limit, offset: $offset) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}": types.GetEnrolledListDocument,
    "query GetEnrollmentRecord($eid: String!) {\n  getEnrollmentRecord(EID: $eid) {\n    ...EnrolledRecord\n  }\n}": types.GetEnrollmentRecordDocument,
    "query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}": types.GetGlobalVarsDocument,
    "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}": types.GetMeDocument,
    "query getSchoolYears {\n  getSchoolYears {\n    name\n    isActive\n  }\n}": types.GetSchoolYearsDocument,
    "query GetStudent($sid: String!) {\n  getStudent(SID: $sid) {\n    ...Student\n  }\n}": types.GetStudentDocument,
    "query getStudents($limit: Int, $search: String, $offset: Int) {\n  getStudents(limit: $limit, search: $search, offset: $offset) {\n    length\n    students {\n      ...Student\n    }\n  }\n}": types.GetStudentsDocument,
    "query getYearLevelSections {\n  getYearLevelSections {\n    id\n    name\n    value\n    sections {\n      id\n      name\n      year_level\n      status\n    }\n  }\n}": types.GetYearLevelSectionsDocument,
    "query Ping {\n  meow\n}": types.PingDocument,
    "query Query {\n  test\n}": types.QueryDocument,
};

export function graphql(source: "fragment Employee on Employee {\n  employee_id\n  id\n  partial_password\n  role\n  status\n  profile {\n    first_name\n    id\n    middle_name\n    last_name\n  }\n}"): (typeof documents)["fragment Employee on Employee {\n  employee_id\n  id\n  partial_password\n  role\n  status\n  profile {\n    first_name\n    id\n    middle_name\n    last_name\n  }\n}"];
export function graphql(source: "fragment EnrolledRecord on EnrolledRecord {\n  SY\n  grade_level_id\n  id\n  SID\n  status\n  section_id\n  student {\n    ...Student\n  }\n}"): (typeof documents)["fragment EnrolledRecord on EnrolledRecord {\n  SY\n  grade_level_id\n  id\n  SID\n  status\n  section_id\n  student {\n    ...Student\n  }\n}"];
export function graphql(source: "fragment Student on Student {\n  id\n  LRN\n  first_name\n  middle_name\n  last_name\n  gender\n  birthday\n  contact_number\n  email\n  enrollment_records {\n    id\n    SY\n    SID\n    grade_level_id\n    section_id\n    status\n  }\n  address {\n    id\n    no\n    street\n    subdiv\n    barangay\n    city\n    province\n    region\n    zip\n  }\n  parent_guardians {\n    id\n    first_name\n    middle_name\n    last_name\n    contact_number\n    email\n    type\n  }\n  requirements {\n    id\n    has_form_137\n    has_psa\n    has_parent_marriage_contract\n    has_report_card\n    has_report_of_rating\n    has_good_moral\n    has_school_government_recognition\n    has_baptismal\n  }\n  school_records {\n    id\n    sy_graduated\n    school_name\n    type\n  }\n  transfer_records {\n    id\n    sy_entered\n    sy_exit\n  }\n  status\n}"): (typeof documents)["fragment Student on Student {\n  id\n  LRN\n  first_name\n  middle_name\n  last_name\n  gender\n  birthday\n  contact_number\n  email\n  enrollment_records {\n    id\n    SY\n    SID\n    grade_level_id\n    section_id\n    status\n  }\n  address {\n    id\n    no\n    street\n    subdiv\n    barangay\n    city\n    province\n    region\n    zip\n  }\n  parent_guardians {\n    id\n    first_name\n    middle_name\n    last_name\n    contact_number\n    email\n    type\n  }\n  requirements {\n    id\n    has_form_137\n    has_psa\n    has_parent_marriage_contract\n    has_report_card\n    has_report_of_rating\n    has_good_moral\n    has_school_government_recognition\n    has_baptismal\n  }\n  school_records {\n    id\n    sy_graduated\n    school_name\n    type\n  }\n  transfer_records {\n    id\n    sy_entered\n    sy_exit\n  }\n  status\n}"];
export function graphql(source: "mutation ActivateSchoolYear($sy: String!) {\n  activateSchoolYear(SY: $sy) {\n    identifier\n    value\n  }\n}"): (typeof documents)["mutation ActivateSchoolYear($sy: String!) {\n  activateSchoolYear(SY: $sy) {\n    identifier\n    value\n  }\n}"];
export function graphql(source: "mutation addEditSection($input: SectionInput!) {\n  addEditSection(input: $input) {\n    year_level\n    name\n    id\n  }\n}"): (typeof documents)["mutation addEditSection($input: SectionInput!) {\n  addEditSection(input: $input) {\n    year_level\n    name\n    id\n  }\n}"];
export function graphql(source: "mutation addEmployee($input: addEmployeeInput!) {\n  addEmployee(input: $input) {\n    ...Employee\n  }\n}"): (typeof documents)["mutation addEmployee($input: addEmployeeInput!) {\n  addEmployee(input: $input) {\n    ...Employee\n  }\n}"];
export function graphql(source: "mutation addStudent($input: StudentInput!) {\n  addStudent(input: $input) {\n    ...Student\n  }\n}"): (typeof documents)["mutation addStudent($input: StudentInput!) {\n  addStudent(input: $input) {\n    ...Student\n  }\n}"];
export function graphql(source: "mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"): (typeof documents)["mutation authMutation($input: AuthInput!) {\n  auth(input: $input) {\n    needNewPassword\n    token\n  }\n}"];
export function graphql(source: "mutation EnableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}"): (typeof documents)["mutation EnableEmployee($employeeId: String!) {\n  enableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}"];
export function graphql(source: "mutation DropEnrollmentRecord($input: [String]) {\n  dropEnrollmentRecord(input: $input) {\n    ...EnrolledRecord\n  }\n}"): (typeof documents)["mutation DropEnrollmentRecord($input: [String]) {\n  dropEnrollmentRecord(input: $input) {\n    ...EnrolledRecord\n  }\n}"];
export function graphql(source: "mutation DisableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}"): (typeof documents)["mutation DisableEmployee($employeeId: String!) {\n  disableEmployee(employee_id: $employeeId) {\n    ...Employee\n  }\n}"];
export function graphql(source: "mutation ToggleSectionStatus($deleteSectionId: String!) {\n  toggleSectionStatus(id: $deleteSectionId) {\n    id\n    name\n    year_level\n    status\n  }\n}"): (typeof documents)["mutation ToggleSectionStatus($deleteSectionId: String!) {\n  toggleSectionStatus(id: $deleteSectionId) {\n    id\n    name\n    year_level\n    status\n  }\n}"];
export function graphql(source: "mutation updateStudentAcademicRecords($input: [StudentSchoolRecordInput]!, $id: String!) {\n  updateStudentAcademicRecords(input: $input, ID: $id) {\n    ...Student\n  }\n}"): (typeof documents)["mutation updateStudentAcademicRecords($input: [StudentSchoolRecordInput]!, $id: String!) {\n  updateStudentAcademicRecords(input: $input, ID: $id) {\n    ...Student\n  }\n}"];
export function graphql(source: "mutation updateStudentAddressInfo($input: StudentAddressInput!, $id: String!) {\n  updateStudentAddressInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"): (typeof documents)["mutation updateStudentAddressInfo($input: StudentAddressInput!, $id: String!) {\n  updateStudentAddressInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"];
export function graphql(source: "mutation updateStudentBasicInfo($input: updateStudentBasicInfoInput!, $id: String!) {\n  updateStudentBasicInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"): (typeof documents)["mutation updateStudentBasicInfo($input: updateStudentBasicInfoInput!, $id: String!) {\n  updateStudentBasicInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"];
export function graphql(source: "mutation updateStudentEnrollmentInfo($input: updateStudentEnrollmentInfo!, $eid: String!) {\n  updateStudentEnrollmentInfo(input: $input, EID: $eid) {\n    ...EnrolledRecord\n  }\n}"): (typeof documents)["mutation updateStudentEnrollmentInfo($input: updateStudentEnrollmentInfo!, $eid: String!) {\n  updateStudentEnrollmentInfo(input: $input, EID: $eid) {\n    ...EnrolledRecord\n  }\n}"];
export function graphql(source: "mutation updateStudentParentInfo($input: updateStudentParentInfo!, $id: String!) {\n  updateStudentParentInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"): (typeof documents)["mutation updateStudentParentInfo($input: updateStudentParentInfo!, $id: String!) {\n  updateStudentParentInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"];
export function graphql(source: "mutation updateStudentRequirementInfo($input: StudentRequirementsInput!, $id: String!) {\n  updateStudentRequirementInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"): (typeof documents)["mutation updateStudentRequirementInfo($input: StudentRequirementsInput!, $id: String!) {\n  updateStudentRequirementInfo(input: $input, ID: $id) {\n    ...Student\n  }\n}"];
export function graphql(source: "query checkUniqueLRN($lrn: String!, $currentLrn: String) {\n  checkUniqueLRN(LRN: $lrn, currentLRN: $currentLrn)\n}"): (typeof documents)["query checkUniqueLRN($lrn: String!, $currentLrn: String) {\n  checkUniqueLRN(LRN: $lrn, currentLRN: $currentLrn)\n}"];
export function graphql(source: "query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    length\n    audit_trail {\n      action_type\n      description\n      employee {\n        ...Employee\n      }\n      timestamp\n      id\n    }\n  }\n}"): (typeof documents)["query getAuditTrails($limit: Int, $search: String, $offset: Int, $filter: auditTrailFilter) {\n  getAuditTrails(limit: $limit, search: $search, offset: $offset, filter: $filter) {\n    length\n    audit_trail {\n      action_type\n      description\n      employee {\n        ...Employee\n      }\n      timestamp\n      id\n    }\n  }\n}"];
export function graphql(source: "query getDashboardCardInfo {\n  getDashboardCardInfo {\n    elem_count\n    pre_elem_count\n    hs_count\n    shs_count\n    total_count\n  }\n}"): (typeof documents)["query getDashboardCardInfo {\n  getDashboardCardInfo {\n    elem_count\n    pre_elem_count\n    hs_count\n    shs_count\n    total_count\n  }\n}"];
export function graphql(source: "query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    length\n    employees {\n      ...Employee\n    }\n  }\n}"): (typeof documents)["query getEmployees($limit: Int, $offset: Int, $search: String, $filter: employeesFilter) {\n  getEmployees(limit: $limit, offset: $offset, search: $search, filter: $filter) {\n    length\n    employees {\n      ...Employee\n    }\n  }\n}"];
export function graphql(source: "query GetEnrolledArchiveList($limit: Int!, $offset: Int!, $filter: getEnrolledArchiveListFilter!) {\n  getEnrolledArchiveList(limit: $limit, offset: $offset, filter: $filter) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}"): (typeof documents)["query GetEnrolledArchiveList($limit: Int!, $offset: Int!, $filter: getEnrolledArchiveListFilter!) {\n  getEnrolledArchiveList(limit: $limit, offset: $offset, filter: $filter) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}"];
export function graphql(source: "query getEnrolledList($limit: Int, $offset: Int) {\n  getEnrolledList(limit: $limit, offset: $offset) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}"): (typeof documents)["query getEnrolledList($limit: Int, $offset: Int) {\n  getEnrolledList(limit: $limit, offset: $offset) {\n    length\n    enrolledRecords {\n      ...EnrolledRecord\n    }\n  }\n}"];
export function graphql(source: "query GetEnrollmentRecord($eid: String!) {\n  getEnrollmentRecord(EID: $eid) {\n    ...EnrolledRecord\n  }\n}"): (typeof documents)["query GetEnrollmentRecord($eid: String!) {\n  getEnrollmentRecord(EID: $eid) {\n    ...EnrolledRecord\n  }\n}"];
export function graphql(source: "query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}"): (typeof documents)["query getGlobalVars {\n  getGlobalVars {\n    audit_trail_types\n    school_year\n  }\n}"];
export function graphql(source: "query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"): (typeof documents)["query GetMe {\n  getMe {\n    employee_id\n    id\n    profile {\n      first_name\n      last_name\n      middle_name\n    }\n    role\n  }\n}"];
export function graphql(source: "query getSchoolYears {\n  getSchoolYears {\n    name\n    isActive\n  }\n}"): (typeof documents)["query getSchoolYears {\n  getSchoolYears {\n    name\n    isActive\n  }\n}"];
export function graphql(source: "query GetStudent($sid: String!) {\n  getStudent(SID: $sid) {\n    ...Student\n  }\n}"): (typeof documents)["query GetStudent($sid: String!) {\n  getStudent(SID: $sid) {\n    ...Student\n  }\n}"];
export function graphql(source: "query getStudents($limit: Int, $search: String, $offset: Int) {\n  getStudents(limit: $limit, search: $search, offset: $offset) {\n    length\n    students {\n      ...Student\n    }\n  }\n}"): (typeof documents)["query getStudents($limit: Int, $search: String, $offset: Int) {\n  getStudents(limit: $limit, search: $search, offset: $offset) {\n    length\n    students {\n      ...Student\n    }\n  }\n}"];
export function graphql(source: "query getYearLevelSections {\n  getYearLevelSections {\n    id\n    name\n    value\n    sections {\n      id\n      name\n      year_level\n      status\n    }\n  }\n}"): (typeof documents)["query getYearLevelSections {\n  getYearLevelSections {\n    id\n    name\n    value\n    sections {\n      id\n      name\n      year_level\n      status\n    }\n  }\n}"];
export function graphql(source: "query Ping {\n  meow\n}"): (typeof documents)["query Ping {\n  meow\n}"];
export function graphql(source: "query Query {\n  test\n}"): (typeof documents)["query Query {\n  test\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;