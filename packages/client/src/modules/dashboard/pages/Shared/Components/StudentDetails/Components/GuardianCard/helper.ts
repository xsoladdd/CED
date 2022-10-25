import * as Yup from "yup";

const personProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Field Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  middleName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  mobileNumber: Yup.string()
    .min(11, "Field Too Short!")
    .max(14, "Too Long!")
    .required("Required"),
});

export const guardianSchema = Yup.object().shape({
  father: personProfileSchema,
  mother: personProfileSchema,
  guardian: personProfileSchema,
});
