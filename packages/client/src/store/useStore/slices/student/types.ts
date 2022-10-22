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

export interface IselectedStudentState {
  basicInfo: IStudentBasicInfo;
}

export interface IStudentSlice {
  student: {
    selectedStudent: IselectedStudentState;
    setSelectedStudent: (params: IselectedStudentState) => void;
    setSelectedBasicInfo: (params: IStudentBasicInfo) => void;
    resetSelectedStudent: () => void;
  };
}
