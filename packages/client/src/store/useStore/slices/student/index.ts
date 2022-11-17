import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedAcademicRecordInfo } from "./actions/setSelectedAcademicRecordInfo";
import { setSelectedAddressInfo } from "./actions/setSelectedAddressInfo";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { setSelectedRecord } from "./actions/setSelectedRecord";
import { setSelectedRequirementsInfo } from "./actions/setSelectedRequirementsInfo";
import {
  defaultEnrolledStudentList,
  defaultSelectedStudent,
} from "./intialState";
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
    selectedStudent: defaultSelectedStudent,
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
    setSelectedAcademicRecordInfo: setSelectedAcademicRecordInfo(set),
    setSelectedAddressInfo: setSelectedAddressInfo(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
