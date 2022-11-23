import { SetState } from "zustand";
import { IStudentSlice } from "../types";

export const resetSelectedStudent = (set: SetState<IStudentSlice>) => () =>
  set(
    (old: IStudentSlice): IStudentSlice => ({
      student: {
        ...old.student,
        selectedStudent: {
          first_name: "",
          gender: "M",
          last_name: "",
          LRN: "",
          contact_number: "",
          email: "",
          middle_name: "",
        },
        selectedRecord: {
          id: undefined,
          type: undefined,
        },
      },
    })
  );
