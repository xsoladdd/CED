import * as yup from "yup";

const profileSchema = yup.object().shape({
  first_name: yup.string().min(2).required("required"),
  middle_name: yup.string(),
  last_name: yup.string().min(2).required("required"),
});

export const addEmployeeSchema = yup.object().shape({
  employee_id: yup.string().min(8).required("required"),
  password: yup.string().min(8).required("required"),
  profile: profileSchema,
});

/*
 role: String!
  employee_id: String!
  password: String!
  profile: EmployeeProfileInput



  first_name: String!
  middle_name: String
  last_name: String!
*/
