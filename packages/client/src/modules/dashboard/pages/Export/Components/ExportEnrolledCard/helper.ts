import { defaultEnrolledStudentList } from "../../../../../../store/useStore/slices/student/intialState";

export const dummyData = defaultEnrolledStudentList;

export const defaultCheckboxData = {
  LRN: false,
  SID: false,
  whole_name: false,
  first_name: false,
  middle_name: false,
  last_name: false,
  email: false,
  mobile_number: false,
  section: false,
  year: false,
  birthday: false,
  gender: false,
  status: false,
};

export const checkAllCheckboxData = {
  LRN: true,
  SID: true,
  whole_name: true,
  first_name: true,
  middle_name: true,
  last_name: true,
  email: true,
  mobile_number: true,
  section: true,
  year: true,
  birthday: true,
  gender: true,
  status: true,
};
