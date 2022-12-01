import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedAddressInfo } from "./actions/setSelectedAddressInfo";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { setSelectedRecord } from "./actions/setSelectedRecord";
import { setSelectedRequirementsInfo } from "./actions/setSelectedRequirementsInfo";
import { defaultEnrolledStudentList } from "./intialState";
import { IStudentSlice } from "./types";

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
    selectedRecord: {
      id: undefined,
      type: undefined,
    },
    setSelectedRecord: setSelectedRecord(set),
    studentList: [],
    enrolledStudentList: defaultEnrolledStudentList,
    selectedStudent: {
      first_name: "",
      gender: "M",
      last_name: "",
      LRN: "",
      contact_number: "",
      email: "",
      middle_name: "",
    },
    setSelectedStudent: (selectedStudent) =>
      set(
        ({ student }: IStudentSlice): IStudentSlice => ({
          student: {
            ...student,
            selectedStudent,
          },
        })
      ),
    setSelectedRequirementsInfo: setSelectedRequirementsInfo(set),
    resetSelectedStudent: resetSelectedStudent(set),
    setSelectedGuardianInfo: setSelectedGuardianInfo(set),
    setSelectedAddressInfo: setSelectedAddressInfo(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
