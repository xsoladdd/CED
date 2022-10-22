import {
  IselectedStudentState,
  IStudentBasicInfo,
  IStudentSlice,
} from "./types";

const defaultState: IselectedStudentState = {
  basicInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    birthday: "",
    gender: "M",
    LRN: "",
  },
};

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
    selectedStudent: {
      basicInfo: {
        firstName: "john",
        middleName: "",
        lastName: "doe",
        mobileNumber: "09331423122",
        email: "johndoe@gmail.com",
        birthday: "12/24/1993",
        gender: "M",
        LRN: "0934231234231",
      },
    },
    // qwer  Uncomment if production
    // selectedStudent: defaultState,
    setSelectedStudent: (selectedStudent) =>
      set(
        ({ student }: IStudentSlice): IStudentSlice => ({
          student: {
            ...student,
            selectedStudent,
          },
        })
      ),
    resetSelectedStudent: () =>
      set(
        (old: IStudentSlice): IStudentSlice => ({
          student: {
            ...old.student,
            selectedStudent: defaultState,
          },
        })
      ),
    setSelectedBasicInfo: (basicInfo: IStudentBasicInfo) =>
      set(
        (old: IStudentSlice): IStudentSlice => ({
          student: {
            ...old.student,
            selectedStudent: { ...old.student.selectedStudent, basicInfo },
          },
        })
      ),
  },
});
