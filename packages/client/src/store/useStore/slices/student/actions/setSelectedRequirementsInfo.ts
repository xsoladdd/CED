import { SetState } from "zustand";
import { IStudentRequirementsInfo, IStudentSlice } from "../types";

export const setSelectedRequirementsInfo =
  (set: SetState<IStudentSlice>) =>
  (_requirementInfo: IStudentRequirementsInfo) =>
    set(
      (old: IStudentSlice): IStudentSlice => ({
        student: {
          ...old.student,
          selectedStudent: { ...old.student.selectedStudent },
        },
      })
    );
