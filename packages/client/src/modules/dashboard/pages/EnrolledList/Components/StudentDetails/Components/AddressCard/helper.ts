import * as Yup from "yup";

export const addressInfoSchema = Yup.object().shape({
  region: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  barangay: Yup.string().required("Required"),
  subdiv: Yup.string()
    .min(2, "Field Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  street: Yup.string().min(2, "Field Too Short!").max(50, "Too Long!"),
  // .required("Required"),
  no: Yup.string().min(2, "Field Too Short!").max(50, "Too Long!"),
  // .required("Required"),
  zipcode: Yup.string()
    .min(3, "Field Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
