import { SetState } from "zustand";
import { IStudentGuardianInfo, IStudentSlice } from "../types";

export const setSelectedGuardianInfo =
  (set: SetState<IStudentSlice>) => (_guardianInfo: IStudentGuardianInfo) =>
    set(
      (old: IStudentSlice): IStudentSlice => ({
        student: {
          ...old.student,
          selectedStudent: { ...old.student.selectedStudent },
        },
      })
    );
