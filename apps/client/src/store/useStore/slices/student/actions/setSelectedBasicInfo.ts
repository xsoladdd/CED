import { SetState } from "zustand";
import { IStudentBasicInfo, IStudentSlice } from "../types";

export const setSelectedBasicInfo =
  (set: SetState<IStudentSlice>) => (_basicInfo: IStudentBasicInfo) =>
    set(
      (old: IStudentSlice): IStudentSlice => ({
        student: {
          ...old.student,
          selectedStudent: { ...old.student.selectedStudent },
        },
      })
    );
