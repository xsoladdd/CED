import * as Yup from "yup";
import { addressInfoSchema } from "../../../../Shared/Components/StudentDetails/Components/AddressCard/helper";
import { basicInfoSchema } from "../../../../Shared/Components/StudentDetails/Components/BasicInfoCard/helper";
import { guardianSchema } from "../../../../Shared/Components/StudentDetails/Components/GuardianCard/helper";
import { IStudentAddingForm } from "./types";
// import { academicRecordInfoSchema } from "../../../Shared/Components/StudentDetails/Components/AcademicRecordCard/helper";

// export const addingFormSchema = Yup.object({
//   basicInfo: basicInfoSchema,
//   addressInfo: addressInfoSchema,
//   guardianInfo: guardianSchema,
// });

export const defaultValue: IStudentAddingForm = {
  basicInfo: {
    birthday: "",
    email: "",
    first_name: "",
    gender: "M",
    last_name: "",
    LRN: "",
    middle_name: "",
    mobile_number: "",
  },
  guardianInfo: {
    father: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    mother: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
    guardian: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      mobileNumber: "",
    },
  },
  addressInfo: {
    barangay: "01",
    city: "",
    no: "",
    province: "",
    region: "",
    street: "",
    subdiv: "",
    zipcode: "",
  },
  academicInfo: [
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
  ],
};

export const addingAcademicRecordInfoSchema = Yup.array(
  Yup.object().shape({
    school: Yup.lazy(() =>
      Yup.string().when("school", {
        is: (exists: any) => !!exists,
        then: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
      })
    ),
    schoolYear: Yup.string().when("school", {
      is: (exists: any) => !!exists,
      then: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      otherwise: Yup.string(),
    }),
    academicLevel: Yup.string()
      .oneOf(["Pre-Elementary", "Elementary", "Junior High", "Senior High"])
      .when("school", {
        is: (school: any) => school!,
        then: Yup.string().required("Required"),
      }),
  })
);
export const addingFormSchema = Yup.object().shape<
  Record<keyof IStudentAddingForm, Yup.AnySchema>
>({
  basicInfo: basicInfoSchema,
  addressInfo: addressInfoSchema,
  guardianInfo: guardianSchema,
  academicInfo: addingAcademicRecordInfoSchema,
});
