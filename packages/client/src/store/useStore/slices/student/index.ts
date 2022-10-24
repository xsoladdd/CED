import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { defaultState } from "./intialState";
import { IStudentSlice } from "./types";

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
    // selectedStudent: {
    //   basicInfo: {
    //     firstName: "john",
    //     middleName: "",
    //     lastName: "doe",
    //     mobileNumber: "09331423122",
    //     email: "johndoe@gmail.com",
    //     birthday: "12/24/1993",
    //     gender: "M",
    //     LRN: "0934231234231",
    //   },
    //   guardianInfo: {
    //     father: {
    //       email: "",
    //       firstName: "",
    //       lastName: "",
    //       middleName: "",
    //       mobileNumber: "",
    //     },
    //     mother: {
    //       email: "",
    //       firstName: "",
    //       lastName: "",
    //       middleName: "",
    //       mobileNumber: "",
    //     },
    //     guardian: {
    //       email: "",
    //       firstName: "",
    //       lastName: "",
    //       middleName: "",
    //       mobileNumber: "",
    //     },
    //   },
    // },
    // qwer  Uncomment if production
    selectedStudent: defaultState,
    setSelectedStudent: (selectedStudent) =>
      set(
        ({ student }: IStudentSlice): IStudentSlice => ({
          student: {
            ...student,
            selectedStudent,
          },
        })
      ),
    setSelectedGuardianInfo: setSelectedGuardianInfo(set),
    resetSelectedStudent: resetSelectedStudent(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
