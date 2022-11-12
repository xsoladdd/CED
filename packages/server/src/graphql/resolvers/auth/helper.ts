import * as yup from "yup";

export const loginInputSchema = yup.object().shape({
  EID: yup.string().min(8).required("required"),
  password: yup.string().min(8).required("required"),
});
