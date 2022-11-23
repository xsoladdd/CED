import { EnrolledRecords } from "../../Student/EnrolledRecords";
import { StudentAddress } from "../../Student/StudentAddress";
import { StudentParentGuardian } from "../../Student/StudentParentGuardian";
import { StudentRequirements } from "../../Student/StudentRequirements";

export const generateAddress = () => {
  const address: StudentAddress = {
    barangay: "",
    city: "",
    province: "",
    region: "",
    no: "",
    zip: "",
    street: "",
    subdiv: "",
  };
  return address;
};

export const generateParentGuardian = () => {
  const parentGuardian: Array<StudentParentGuardian> = [
    {
      first_name: "Menard",
      middle_name: "Vaneschi",
      last_name: "Boar",
      contact_number: "09294952534",
      type: "M",
      email: "mboar0@phpbb.com",
    },
    {
      first_name: "Bartholomeus",
      middle_name: "Bertolin",
      last_name: "Cowper",
      contact_number: "09991715440",
      type: "G",
      email: "bcowper1@psu.edu",
    },
    {
      first_name: "Andres",
      middle_name: "Gilhouley",
      last_name: "Rickis",
      contact_number: "09987577681",
      type: "F",
      email: "arickis2@dyndns.org",
    },
  ];
  return parentGuardian;
};
export const generateRequirements = () => {
  const requirements: StudentRequirements = {
    has_baptismal: true,
    has_form_137: true,
    has_good_moral: true,
    has_parent_marriage_contract: true,
    has_psa: true,
    has_report_card: true,
    has_report_of_rating: true,
    has_school_government_recognition: true,
  };
  return requirements;
};

export const generateEnrollmentRecord = () => {
  const enrollmentList: Array<EnrolledRecords> = [
    { grade_level_id: "01", SY: "2022-2023", section_id: "01" },
    { grade_level_id: "02", SY: "2021-2022", section_id: "01" },
    { grade_level_id: "03", SY: "2020-2021", section_id: "01" },
  ];
  return enrollmentList;
};
