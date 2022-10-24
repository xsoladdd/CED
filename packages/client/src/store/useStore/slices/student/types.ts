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
export interface IselectedStudentState {
  basicInfo: IStudentBasicInfo;
  guardianInfo: IStudentGuardianInfo;
  addressInfo: IStudentAddressInfo;
}

export interface IStudentSlice {
  student: {
    selectedStudent: IselectedStudentState;
    setSelectedStudent: (params: IselectedStudentState) => void;
    setSelectedBasicInfo: (params: IStudentBasicInfo) => void;
    setSelectedGuardianInfo: (params: IStudentGuardianInfo) => void;
    resetSelectedStudent: () => void;
  };
}
