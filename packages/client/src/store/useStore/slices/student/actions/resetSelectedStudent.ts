import { SetState } from "zustand";
import { defaultSelectedStudent } from "../intialState";
import { IStudentSlice } from "../types";

export const resetSelectedStudent = (set: SetState<IStudentSlice>) => () =>
  set(
    (old: IStudentSlice): IStudentSlice => ({
      student: {
        ...old.student,
        selectedStudent: defaultSelectedStudent,
        selectedRecord: {
          id: undefined,
          type: undefined,
        },
      },
    })
  );
