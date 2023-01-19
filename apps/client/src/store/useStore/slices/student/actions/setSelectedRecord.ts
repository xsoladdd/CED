import { SetState } from "zustand";
import { IStudentSlice, selectedType } from "../types";

export const setSelectedRecord =
  (set: SetState<IStudentSlice>) => (id: string, type: selectedType) =>
    set(
      (old: IStudentSlice): IStudentSlice => ({
        student: {
          ...old.student,
          selectedRecord: {
            id,
            type,
          },
        },
      })
    );
