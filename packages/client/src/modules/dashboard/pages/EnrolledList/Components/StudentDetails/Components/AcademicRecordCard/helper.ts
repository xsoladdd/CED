import * as Yup from "yup";

export const academicRecordInfoSchema = Yup.array(
  Yup.object().shape({
    isActive: Yup.boolean(),
    school: Yup.string()
      .min(2)
      .max(50)
      // .when("email", {
      //   is: (exists: any) => !!exists,
      //   then: Yup.string().required(),
      //   otherwise: Yup.string(),
      // }),
      .when("isActive", {
        is: true,
        then: Yup.string().required("Required since field is active"),
      }),
    schoolYear: Yup.string()
      .min(2)
      .max(50)
      .when("isActive", {
        is: true,
        then: Yup.string().required("Required since field is active"),
      }),
    academicLevel: Yup.string()
      .oneOf(["Pre-Elementary", "Elementary", "Junior High", "Senior High"])
      .when("school", {
        is: (school: any) => school!,
        then: Yup.string().required("Required"),
      }),
  })
);
