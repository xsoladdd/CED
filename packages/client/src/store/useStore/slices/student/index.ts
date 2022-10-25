import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedAcademicRecordInfo } from "./actions/setSelectedAcademicRecordInfo";
import { setSelectedAddressInfo } from "./actions/setSelectedAddressInfo";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { setSelectedRecord } from "./actions/setSelectedRecord";
import {
  defaultEnrolledStudentList,
  defaultSelectedStudent,
  defaultStudentList,
} from "./intialState";
import { IStudentSlice } from "./types";

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
    selectedRecord: {
      id: undefined,
      type: undefined,
    },
    setSelectedRecord: setSelectedRecord(set),
    studentList: defaultStudentList,
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
    resetSelectedStudent: resetSelectedStudent(set),
    setSelectedGuardianInfo: setSelectedGuardianInfo(set),
    setSelectedAcademicRecordInfo: setSelectedAcademicRecordInfo(set),
    setSelectedAddressInfo: setSelectedAddressInfo(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
