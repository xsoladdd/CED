import { resetSelectedStudent } from "./actions/resetSelectedStudent";
import { setSelectedAddressInfo } from "./actions/setSelectedAddressInfo";
import { setSelectedBasicInfo } from "./actions/setSelectedBasicInfo";
import { setSelectedGuardianInfo } from "./actions/setSelectedGuardianInfo";
import { setSelectedRecord } from "./actions/setSelectedRecord";
import { setSelectedRequirementsInfo } from "./actions/setSelectedRequirementsInfo";
import { defaultEnrolledStudentList } from "./intialState";
import { IStudentSlice } from "./types";

export const studentSlice: StoreSlice<IStudentSlice> = (set) => ({
  student: {
    selectedRecord: {
      id: undefined,
      type: undefined,
    },
    setSelectedRecord: setSelectedRecord(set),
    studentList: [],
    enrolledStudentList: defaultEnrolledStudentList,
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
    setSelectedStudent: (selectedStudent) =>
      set(
        ({ student }: IStudentSlice): IStudentSlice => ({
          student: {
            ...student,
            selectedStudent,
          },
        })
      ),
    checkStudentEditStatus: false,
    setCheckStudentEditStatus: (status) =>
      set(({ student }: IStudentSlice): IStudentSlice => {
        return {
          student: {
            ...student,
            checkStudentEditStatus: status,
          },
        };
      }),
    setSelectedRequirementsInfo: setSelectedRequirementsInfo(set),
    resetSelectedStudent: resetSelectedStudent(set),
    setSelectedGuardianInfo: setSelectedGuardianInfo(set),
    setSelectedAddressInfo: setSelectedAddressInfo(set),
    setSelectedBasicInfo: setSelectedBasicInfo(set),
  },
});
