import * as Yup from "yup";

export const loginShema = Yup.object().shape({
  EID: Yup.string()
    .min(8, `Too Short!`)
    .max(30, `Too Long!`)
    .required(`Employee ID is required`),
  password: Yup.string()
    .min(8, `Too Short!`)
    .max(20, `Too Long!`)
    .required(`Password is required`),
});
