import * as Yup from "yup";
export const mobile_number_regex = /^(09|\+639)\d{9}$/;

export const basicInfoSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Field Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  middle_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .nullable(),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  birthday: Yup.date().required("Required"),
  gender: Yup.string().oneOf(["M", "F", "m", "f"]).required("Required"),
  LRN: Yup.string()
    .min(14, "Field Too Short!")
    .max(16, "Too Long!")
    .required("Required"),
  contact_number: Yup.string()
    .min(11, "Field Too Short!")
    .max(14, "Too Long!")
    .matches(mobile_number_regex, "Invalid Format")
    .required("Required"),
});
