import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  auth?: Maybe<AuthResponse>;
  changeEmployeePassword?: Maybe<Employee>;
  changeMyPassword?: Maybe<Employee>;
  disableEmployee?: Maybe<Employee>;
  dropEnrollmentRecord?: Maybe<Array<Maybe<EnrolledRecord>>>;
  enableEmployee?: Maybe<Employee>;
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
  getStudents?: Maybe<GetStudentsResponse>;
  getYearLevelSections?: Maybe<Array<Maybe<YearLevelSection>>>;
  meow?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['String']>;
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
  filter: GetEnrolledArchiveListFilter;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetEnrolledListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
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


export type QueryGetStudentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
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

export type YearLevelSection = {
  __typename?: 'yearLevelSection';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sections?: Maybe<Array<Maybe<Section>>>;
  value: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuditTrail: ResolverTypeWrapper<AuditTrail>;
  AuthInput: AuthInput;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Employee: ResolverTypeWrapper<Employee>;
  EmployeeInput: EmployeeInput;
  EmployeeProfile: ResolverTypeWrapper<EmployeeProfile>;
  EmployeeProfileInput: EmployeeProfileInput;
  EnrolledRecord: ResolverTypeWrapper<EnrolledRecord>;
  GlobalVars: ResolverTypeWrapper<GlobalVars>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Section: ResolverTypeWrapper<Section>;
  SectionInput: SectionInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Student: ResolverTypeWrapper<Student>;
  StudentAddress: ResolverTypeWrapper<StudentAddress>;
  StudentAddressInput: StudentAddressInput;
  StudentInput: StudentInput;
  StudentParentGuardian: ResolverTypeWrapper<StudentParentGuardian>;
  StudentParentGuardianInput: StudentParentGuardianInput;
  StudentRequirements: ResolverTypeWrapper<StudentRequirements>;
  StudentRequirementsInput: StudentRequirementsInput;
  StudentSchoolRecord: ResolverTypeWrapper<StudentSchoolRecord>;
  StudentSchoolRecordInput: StudentSchoolRecordInput;
  StudentTransferRecord: ResolverTypeWrapper<StudentTransferRecord>;
  addEmployeeInput: AddEmployeeInput;
  auditTrailFilter: AuditTrailFilter;
  employeesFilter: EmployeesFilter;
  getAuditTrailsResponse: ResolverTypeWrapper<GetAuditTrailsResponse>;
  getCardInfoResponse: ResolverTypeWrapper<GetCardInfoResponse>;
  getEmployeesResponse: ResolverTypeWrapper<GetEmployeesResponse>;
  getEnrolledArchiveListFilter: GetEnrolledArchiveListFilter;
  getEnrolledListResponse: ResolverTypeWrapper<GetEnrolledListResponse>;
  getGlobalVarsResponse: ResolverTypeWrapper<GetGlobalVarsResponse>;
  getSchoolYearsResponse: ResolverTypeWrapper<GetSchoolYearsResponse>;
  getStudentsResponse: ResolverTypeWrapper<GetStudentsResponse>;
  updateStudentBasicInfoInput: UpdateStudentBasicInfoInput;
  updateStudentEnrollmentInfo: UpdateStudentEnrollmentInfo;
  updateStudentParentInfo: UpdateStudentParentInfo;
  yearLevelSection: ResolverTypeWrapper<YearLevelSection>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuditTrail: AuditTrail;
  AuthInput: AuthInput;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean'];
  Employee: Employee;
  EmployeeInput: EmployeeInput;
  EmployeeProfile: EmployeeProfile;
  EmployeeProfileInput: EmployeeProfileInput;
  EnrolledRecord: EnrolledRecord;
  GlobalVars: GlobalVars;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Section: Section;
  SectionInput: SectionInput;
  String: Scalars['String'];
  Student: Student;
  StudentAddress: StudentAddress;
  StudentAddressInput: StudentAddressInput;
  StudentInput: StudentInput;
  StudentParentGuardian: StudentParentGuardian;
  StudentParentGuardianInput: StudentParentGuardianInput;
  StudentRequirements: StudentRequirements;
  StudentRequirementsInput: StudentRequirementsInput;
  StudentSchoolRecord: StudentSchoolRecord;
  StudentSchoolRecordInput: StudentSchoolRecordInput;
  StudentTransferRecord: StudentTransferRecord;
  addEmployeeInput: AddEmployeeInput;
  auditTrailFilter: AuditTrailFilter;
  employeesFilter: EmployeesFilter;
  getAuditTrailsResponse: GetAuditTrailsResponse;
  getCardInfoResponse: GetCardInfoResponse;
  getEmployeesResponse: GetEmployeesResponse;
  getEnrolledArchiveListFilter: GetEnrolledArchiveListFilter;
  getEnrolledListResponse: GetEnrolledListResponse;
  getGlobalVarsResponse: GetGlobalVarsResponse;
  getSchoolYearsResponse: GetSchoolYearsResponse;
  getStudentsResponse: GetStudentsResponse;
  updateStudentBasicInfoInput: UpdateStudentBasicInfoInput;
  updateStudentEnrollmentInfo: UpdateStudentEnrollmentInfo;
  updateStudentParentInfo: UpdateStudentParentInfo;
  yearLevelSection: YearLevelSection;
};

export type AuditTrailResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuditTrail'] = ResolversParentTypes['AuditTrail']> = {
  action_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  needNewPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  audit?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuditTrail']>>>, ParentType, ContextType>;
  employee_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  partial_password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['EmployeeProfile']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmployeeProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmployeeProfile'] = ResolversParentTypes['EmployeeProfile']> = {
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnrolledRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnrolledRecord'] = ResolversParentTypes['EnrolledRecord']> = {
  SID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  SY?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grade_level_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  section_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalVarsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalVars'] = ResolversParentTypes['GlobalVars']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  identifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activateSchoolYear?: Resolver<Maybe<ResolversTypes['GlobalVars']>, ParentType, ContextType, RequireFields<MutationActivateSchoolYearArgs, 'SY'>>;
  addEditSection?: Resolver<Maybe<ResolversTypes['Section']>, ParentType, ContextType, RequireFields<MutationAddEditSectionArgs, 'input'>>;
  addEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationAddEmployeeArgs, 'input'>>;
  addStudent?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationAddStudentArgs, 'input'>>;
  auth?: Resolver<Maybe<ResolversTypes['AuthResponse']>, ParentType, ContextType, RequireFields<MutationAuthArgs, 'input'>>;
  changeEmployeePassword?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationChangeEmployeePasswordArgs, 'employee_id' | 'password'>>;
  changeMyPassword?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationChangeMyPasswordArgs, 'password'>>;
  disableEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationDisableEmployeeArgs, 'employee_id'>>;
  dropEnrollmentRecord?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnrolledRecord']>>>, ParentType, ContextType, Partial<MutationDropEnrollmentRecordArgs>>;
  enableEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationEnableEmployeeArgs, 'employee_id'>>;
  resetEmployeePassword?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<MutationResetEmployeePasswordArgs, 'employee_id' | 'password'>>;
  toggleSectionStatus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType, RequireFields<MutationToggleSectionStatusArgs, 'id'>>;
  updateStudentAcademicRecords?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationUpdateStudentAcademicRecordsArgs, 'ID' | 'input'>>;
  updateStudentAddressInfo?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationUpdateStudentAddressInfoArgs, 'ID' | 'input'>>;
  updateStudentBasicInfo?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationUpdateStudentBasicInfoArgs, 'ID' | 'input'>>;
  updateStudentEnrollmentInfo?: Resolver<Maybe<ResolversTypes['EnrolledRecord']>, ParentType, ContextType, RequireFields<MutationUpdateStudentEnrollmentInfoArgs, 'EID' | 'input'>>;
  updateStudentParentInfo?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationUpdateStudentParentInfoArgs, 'ID' | 'input'>>;
  updateStudentRequirementInfo?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<MutationUpdateStudentRequirementInfoArgs, 'ID' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkUniqueLRN?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryCheckUniqueLrnArgs, 'LRN'>>;
  getAuditTrails?: Resolver<ResolversTypes['getAuditTrailsResponse'], ParentType, ContextType, Partial<QueryGetAuditTrailsArgs>>;
  getDashboardCardInfo?: Resolver<Maybe<ResolversTypes['getCardInfoResponse']>, ParentType, ContextType>;
  getEmployee?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType, RequireFields<QueryGetEmployeeArgs, 'employee_id'>>;
  getEmployees?: Resolver<ResolversTypes['getEmployeesResponse'], ParentType, ContextType, Partial<QueryGetEmployeesArgs>>;
  getEnrolledArchiveList?: Resolver<Maybe<ResolversTypes['getEnrolledListResponse']>, ParentType, ContextType, RequireFields<QueryGetEnrolledArchiveListArgs, 'filter' | 'limit' | 'offset'>>;
  getEnrolledList?: Resolver<Maybe<ResolversTypes['getEnrolledListResponse']>, ParentType, ContextType, Partial<QueryGetEnrolledListArgs>>;
  getEnrollmentRecord?: Resolver<ResolversTypes['EnrolledRecord'], ParentType, ContextType, RequireFields<QueryGetEnrollmentRecordArgs, 'EID'>>;
  getGlobalVars?: Resolver<Maybe<ResolversTypes['getGlobalVarsResponse']>, ParentType, ContextType>;
  getMe?: Resolver<Maybe<ResolversTypes['Employee']>, ParentType, ContextType>;
  getSchoolYears?: Resolver<Maybe<Array<Maybe<ResolversTypes['getSchoolYearsResponse']>>>, ParentType, ContextType>;
  getSections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType, RequireFields<QueryGetSectionsArgs, 'yearLevel'>>;
  getStudent?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryGetStudentArgs, 'SID'>>;
  getStudents?: Resolver<Maybe<ResolversTypes['getStudentsResponse']>, ParentType, ContextType, Partial<QueryGetStudentsArgs>>;
  getYearLevelSections?: Resolver<Maybe<Array<Maybe<ResolversTypes['yearLevelSection']>>>, ParentType, ContextType>;
  meow?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Section'] = ResolversParentTypes['Section']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  year_level?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  LRN?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['StudentAddress']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enrollment_records?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnrolledRecord']>>>, ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent_guardians?: Resolver<Maybe<Array<Maybe<ResolversTypes['StudentParentGuardian']>>>, ParentType, ContextType>;
  requirements?: Resolver<Maybe<ResolversTypes['StudentRequirements']>, ParentType, ContextType>;
  school_records?: Resolver<Maybe<Array<Maybe<ResolversTypes['StudentSchoolRecord']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transfer_records?: Resolver<Maybe<Array<Maybe<ResolversTypes['StudentTransferRecord']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentAddress'] = ResolversParentTypes['StudentAddress']> = {
  barangay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  no?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  province?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subdiv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentParentGuardianResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentParentGuardian'] = ResolversParentTypes['StudentParentGuardian']> = {
  contact_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middle_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentRequirementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentRequirements'] = ResolversParentTypes['StudentRequirements']> = {
  has_baptismal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_form_137?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_good_moral?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_parent_marriage_contract?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_psa?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_report_card?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_report_of_rating?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_school_government_recognition?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentSchoolRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentSchoolRecord'] = ResolversParentTypes['StudentSchoolRecord']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  school_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sy_graduated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentTransferRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentTransferRecord'] = ResolversParentTypes['StudentTransferRecord']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  sy_entered?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sy_exit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetAuditTrailsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getAuditTrailsResponse'] = ResolversParentTypes['getAuditTrailsResponse']> = {
  audit_trail?: Resolver<Maybe<Array<Maybe<ResolversTypes['AuditTrail']>>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCardInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getCardInfoResponse'] = ResolversParentTypes['getCardInfoResponse']> = {
  elem_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hs_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pre_elem_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shs_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetEmployeesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getEmployeesResponse'] = ResolversParentTypes['getEmployeesResponse']> = {
  employees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Employee']>>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetEnrolledListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getEnrolledListResponse'] = ResolversParentTypes['getEnrolledListResponse']> = {
  enrolledRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnrolledRecord']>>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetGlobalVarsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getGlobalVarsResponse'] = ResolversParentTypes['getGlobalVarsResponse']> = {
  audit_trail_types?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  school_year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetSchoolYearsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getSchoolYearsResponse'] = ResolversParentTypes['getSchoolYearsResponse']> = {
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetStudentsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['getStudentsResponse'] = ResolversParentTypes['getStudentsResponse']> = {
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<Maybe<ResolversTypes['Student']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearLevelSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['yearLevelSection'] = ResolversParentTypes['yearLevelSection']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Section']>>>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuditTrail?: AuditTrailResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Employee?: EmployeeResolvers<ContextType>;
  EmployeeProfile?: EmployeeProfileResolvers<ContextType>;
  EnrolledRecord?: EnrolledRecordResolvers<ContextType>;
  GlobalVars?: GlobalVarsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Section?: SectionResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentAddress?: StudentAddressResolvers<ContextType>;
  StudentParentGuardian?: StudentParentGuardianResolvers<ContextType>;
  StudentRequirements?: StudentRequirementsResolvers<ContextType>;
  StudentSchoolRecord?: StudentSchoolRecordResolvers<ContextType>;
  StudentTransferRecord?: StudentTransferRecordResolvers<ContextType>;
  getAuditTrailsResponse?: GetAuditTrailsResponseResolvers<ContextType>;
  getCardInfoResponse?: GetCardInfoResponseResolvers<ContextType>;
  getEmployeesResponse?: GetEmployeesResponseResolvers<ContextType>;
  getEnrolledListResponse?: GetEnrolledListResponseResolvers<ContextType>;
  getGlobalVarsResponse?: GetGlobalVarsResponseResolvers<ContextType>;
  getSchoolYearsResponse?: GetSchoolYearsResponseResolvers<ContextType>;
  getStudentsResponse?: GetStudentsResponseResolvers<ContextType>;
  yearLevelSection?: YearLevelSectionResolvers<ContextType>;
};

