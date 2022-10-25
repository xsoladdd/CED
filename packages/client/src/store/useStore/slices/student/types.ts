export interface IStudentBasicInfo {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  birthday: string;
  gender: "M" | "F";
}

interface IPersonProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

export interface IStudentGuardianInfo {
  father: IPersonProfile;
  mother: IPersonProfile;
  guardian: IPersonProfile;
}

export interface IStudentAddressInfo {
  region: string;
  province: string;
  city: string;
  barangay: string;
  subdiv: string;
  street: string;
  no: string;
  zipcode: string;
}

export interface IStudentAcademicInfo {
  school: string;
  schoolYear: string;
  academicLevel:
    | "Pre-Elementary"
    | "Elementary"
    | "Junior High"
    | "Senior High";
}

export interface IselectedStudentState {
  basicInfo: IStudentBasicInfo;
  guardianInfo: IStudentGuardianInfo;
  addressInfo: IStudentAddressInfo;
  academicInfo: Array<IStudentAcademicInfo>;
}

export interface IstudentData extends IStudentBasicInfo {
  status: "E" | "A" | "NE"; // Enrolled, Alumni and Not Enrolled
  id: string;
}

export interface IenrolledStudent {
  SID: string;
  section: string;
  grade_level: string;
  status: "E" | "NE";
  id: string;
  student: IStudentBasicInfo;
}

export type selectedType =
  | "student-record"
  | "enrollment-record"
  | "reg-card"
  | undefined;
export interface IStudentSlice {
  student: {
    studentList: Array<IstudentData>;
    enrolledStudentList: Array<IenrolledStudent>;
    selectedRecord: {
      id: string | undefined;
      type: selectedType;
    };
    setSelectedRecord: (id: string, type: selectedType) => void;
    selectedStudent: IselectedStudentState;
    setSelectedStudent: (params: IselectedStudentState) => void;
    setSelectedBasicInfo: (params: IStudentBasicInfo) => void;
    setSelectedGuardianInfo: (params: IStudentGuardianInfo) => void;
    setSelectedAddressInfo: (params: IStudentAddressInfo) => void;
    setSelectedAcademicRecordInfo: (
      params: Array<IStudentAcademicInfo>
    ) => void;
    resetSelectedStudent: () => void;
  };
}
