import * as Yup from "yup";

export const basicInfoSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Field Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  middle_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  birthday: Yup.date().required("Required"),
  gender: Yup.string().oneOf(["M", "F"]).required("Required"),
  LRN: Yup.string()
    .min(14, "Field Too Short!")
    .max(16, "Too Long!")
    .required("Required"),
  mobile_number: Yup.string()
    .min(11, "Field Too Short!")
    .max(14, "Too Long!")
    .required(),
});
