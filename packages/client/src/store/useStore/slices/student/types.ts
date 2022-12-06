import { Student } from "../../../../graphQL/generated/graphql";

export interface IStudentBasicInfo {
  LRN: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  birthday: string;
  gender: "M" | "F";
}

interface IPersonProfile {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
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
  zip: string;
}

export interface IStudentRequirementsInfo {
  has_form_137: boolean;
  has_psa: boolean;
  has_parent_marriage_contract: boolean;
  has_report_card: boolean;
  has_report_of_rating: boolean;
  has_good_moral: boolean;
  has_school_government_recognition: boolean;
  has_baptismal: boolean;
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
  addressInfo: IStudentAddressInfo;
  guardianInfo: IStudentGuardianInfo;
  requirementInfo: IStudentRequirementsInfo;
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
    checkStudentEditStatus: boolean;
    setCheckStudentEditStatus: (status: boolean) => void;
    setSelectedRecord: (id: string, type: selectedType) => void;
    selectedStudent: Student;
    setSelectedStudent: (params: Student) => void;
    setSelectedBasicInfo: (params: IStudentBasicInfo) => void;
    setSelectedGuardianInfo: (params: IStudentGuardianInfo) => void;
    setSelectedAddressInfo: (params: IStudentAddressInfo) => void;
    setSelectedRequirementsInfo: (params: IStudentRequirementsInfo) => void;
    resetSelectedStudent: () => void;
  };
}
