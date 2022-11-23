import { SetState } from "zustand";
import { IStudentAddressInfo, IStudentSlice } from "../types";

export const setSelectedAddressInfo =
  (set: SetState<IStudentSlice>) => (studentAddressInfo: IStudentAddressInfo) =>
    set((old: IStudentSlice): IStudentSlice => {
      console.log(studentAddressInfo);
      return {
        student: {
          ...old.student,
          selectedStudent: {
            ...old.student.selectedStudent,
            // addressInfo: studentAddressInfo,
          },
        },
      };
    });
