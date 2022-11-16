import * as yup from "yup";

const profileSchema = yup.object().shape({
  first_name: yup.string().min(2).required("Required"),
  middle_name: yup.string().min(2),
  last_name: yup.string().min(2).required("Required"),
});

export const addEmployeeFormSchema = yup.object().shape({
  employee_id: yup.string().min(8).required("Required"),
  role: yup.string().oneOf(["SA", "RT", "BD"]),
  password: yup.string().min(8).required("Required"),
  profile: profileSchema,
});

// export const addEmployeeFormSchema = Yup.array(
//   Yup.object().shape({
//     isActive: Yup.boolean(),
//     school: Yup.string()
//       .min(2)
//       .max(50)

//       .when("isActive", {
//         is: true,
//         then: Yup.string().required("Required since field is active"),
//       }),
//     schoolYear: Yup.string()
//       .min(2)
//       .max(50)
//       .when("isActive", {
//         is: true,
//         then: Yup.string().required("Required since field is active"),
//       }),
//     academicLevel: Yup.string()
//       .oneOf(["Pre-Elementary", "Elementary", "Junior High", "Senior High"])
//       .when("school", {
//         is: (school: any) => school!,
//         then: Yup.string().required("Required"),
//       }),
//   })
// );
