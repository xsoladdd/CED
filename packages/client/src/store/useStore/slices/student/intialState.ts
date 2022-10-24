import { IselectedStudentState } from "./types";

export const defaultState: IselectedStudentState = {
  basicInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    birthday: "",
    gender: "M",
    LRN: "",
  },
  guardianInfo: {
    father: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    mother: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    guardian: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
  },

  addressInfo: {
    barangay: "",
    city: "",
    no: "",
    province: "",
    region: "",
    street: "",
    subdiv: "",
    zipcode: "",
  },
  academicInfo: [
    {
      academicLevel: "Pre-Elementary",
      school: "School z",
      schoolYear: "2014-2015",
    },
    {
      academicLevel: "Elementary",
      school: "School x",
      schoolYear: "2014-2015",
    },
    {
      academicLevel: "Senior High",
      school: "School c",
      schoolYear: "2014-2015",
    },
    {
      academicLevel: "Junior High",
      school: "School v",
      schoolYear: "2014-2015",
    },
  ],
};
