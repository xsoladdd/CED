import { SetState } from "zustand";
import { IStudentSlice } from "../types";

export const resetSelectedStudent = (set: SetState<IStudentSlice>) => () =>
  set(
    (old: IStudentSlice): IStudentSlice => ({
      student: {
        ...old.student,
        selectedStudent: {
          id: "",
          LRN: "",
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "m",
          birthday: "2022-07-26",
          contact_number: "",
          email: "",
          enrollment_records: [],
          address: {
            id: "",
            no: "",
            street: "",
            subdiv: "",
            barangay: "",
            city: "",
            province: "",
            region: "",
            zip: "",
          },
          parent_guardians: [],
          requirements: {
            has_form_137: true,
            has_psa: true,
            has_parent_marriage_contract: true,
            has_report_card: true,
            has_report_of_rating: true,
            has_good_moral: true,
            has_school_government_recognition: true,
            has_baptismal: true,
          },
          school_records: [],
          transfer_records: [],
          status: "E",
        },
        selectedRecord: {
          id: undefined,
          type: undefined,
        },
      },
    })
  );
