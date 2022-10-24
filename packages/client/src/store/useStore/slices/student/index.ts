import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedAddressInfo } from "./actions/setSelectedAddressInfo";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { setSelectedAcademicRecordInfo } from "./actions/setSelectedAcademicRecordInfo";
import { defaultState } from "./intialState";
import { IStudentSlice } from "./types";

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
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
    resetSelectedStudent: resetSelectedStudent(set),
    setSelectedGuardianInfo: setSelectedGuardianInfo(set),
    setSelectedAcademicRecordInfo: setSelectedAcademicRecordInfo(set),
    setSelectedAddressInfo: setSelectedAddressInfo(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
