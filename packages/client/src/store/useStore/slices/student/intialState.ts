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
};
