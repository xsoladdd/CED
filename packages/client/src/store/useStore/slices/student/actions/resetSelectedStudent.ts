import { SetState } from "zustand";
import { defaultState } from "../intialState";
import { IStudentSlice } from "../types";

export const resetSelectedStudent = (set: SetState<IStudentSlice>) => () =>
  set(
    (old: IStudentSlice): IStudentSlice => ({
      student: {
        ...old.student,
        selectedStudent: defaultState,
      },
    })
  );
