import * as Yup from "yup";

export const loginShema = Yup.object().shape({
  EID: Yup.string()
    .min(8, `Employee ID is too short!`)
    .max(30, `Employee ID is too long!`)
    .required(`Employee ID is required`),
  password: Yup.string()
    .min(8, `Password too short!`)
    .max(20, `Password is too long!`)
    .required(`Password is required`),
});
