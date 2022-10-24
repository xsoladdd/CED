import { SetState } from "zustand";
import { IStudentGuardianInfo, IStudentSlice } from "../types";

export const setSelectedGuardianInfo =
  (set: SetState<IStudentSlice>) => (guardianInfo: IStudentGuardianInfo) =>
    set(
      (old: IStudentSlice): IStudentSlice => ({
        student: {
          ...old.student,
          selectedStudent: { ...old.student.selectedStudent, guardianInfo },
        },
      })
    );
