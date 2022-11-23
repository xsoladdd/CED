import { SetState } from "zustand";
import { IStudentAcademicInfo, IStudentSlice } from "../types";

export const setSelectedAcademicRecordInfo =
  (set: SetState<IStudentSlice>) =>
  (studentAcademicInfoArr: Array<IStudentAcademicInfo>) =>
    set((old: IStudentSlice): IStudentSlice => {
      console.log(studentAcademicInfoArr);
      return {
        student: {
          ...old.student,
          selectedStudent: {
            ...old.student.selectedStudent,
            // academicInfo: [...studentAcademicInfoArr],
          },
        },
      };
    });
