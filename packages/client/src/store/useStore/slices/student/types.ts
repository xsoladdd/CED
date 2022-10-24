export interface IStudentBasicInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  birthday: string;
  gender: "M" | "F";
  LRN: string;
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

export interface IStudentSlice {
  student: {
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
