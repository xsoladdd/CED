import * as Yup from "yup";

const personProfileSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Field Too Short!").max(50, "Too Long!"),
  // .when("firstName", {
  //   is: (exists: any) => !!exists,
  //   then: Yup.string().required(),
  //   otherwise: Yup.string(),
  // }),
  middleName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  lastName: Yup.string().when("firstName", {
    is: (exists: any) => !!exists,
    then: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    otherwise: Yup.string(),
  }),
  email: Yup.string().when("firstName", {
    is: (exists: any) => !!exists,
    then: Yup.string()
      .email("Invalid email")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    otherwise: Yup.string(),
  }),
  mobileNumber: Yup.string()
    .min(11, "Field Too Short!")
    .max(14, "Too Long!")
    .when("firstName", {
      is: (exists: any) => !!exists,
      then: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      otherwise: Yup.string(),
    }),
});

export const guardianSchema = Yup.object().shape({
  father: personProfileSchema,
  mother: personProfileSchema,
  guardian: personProfileSchema,
});
