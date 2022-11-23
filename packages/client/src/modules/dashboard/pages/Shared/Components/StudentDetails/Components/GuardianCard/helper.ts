import * as Yup from "yup";

const personProfileSchema = Yup.object().shape({
  first_name: Yup.string().min(2, "Field Too Short!").max(50, "Too Long!"),
  // .when("firstName", {
  //   is: (exists: any) => !!exists,
  //   then: Yup.string().required(),
  //   otherwise: Yup.string(),
  // }),
  middle_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  last_name: Yup.string().when("first_name", {
    is: (exists: any) => !!exists,
    then: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    otherwise: Yup.string(),
  }),
  email: Yup.string().when("first_name", {
    is: (exists: any) => !!exists,
    then: Yup.string()
      .email("Invalid email")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    otherwise: Yup.string(),
  }),
  contact_number: Yup.string()
    .min(11, "Field Too Short!")
    .max(14, "Too Long!")
    .when("first_name", {
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
