import * as Yup from "yup";
import {
  IselectedStudentState,
  IStudentAcademicInfo,
  IStudentAddressInfo,
  IStudentBasicInfo,
  IStudentGuardianInfo,
} from "../../../../../../../store/useStore/slices/student/types";
import { addressInfoSchema } from "../../../../Shared/Components/StudentDetails/Components/AddressCard/helper";
import { basicInfoSchema } from "../../../../Shared/Components/StudentDetails/Components/BasicInfoCard/helper";
import { guardianSchema } from "../../../../Shared/Components/StudentDetails/Components/GuardianCard/helper";
export const defaultValue: IselectedStudentState = {
  basicInfo: {
    birthday: "1997-01-01",
    email: "",
    first_name: "",
    gender: "M",
    last_name: "",
    LRN: "",
    middle_name: "",
    contact_number: "",
  },
  guardianInfo: {
    father: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      contact_number: "",
    },
    mother: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      contact_number: "",
    },
    guardian: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      contact_number: "",
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
    zip: "",
  },
  academicInfo: [
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
    { academicLevel: "Pre-Elementary", school: "", schoolYear: "" },
  ],
  requirementInfo: {
    has_form_137: false,
    has_baptismal: false,
    has_good_moral: false,
    has_parent_marriage_contract: false,
    has_psa: false,
    has_report_card: false,
    has_report_of_rating: false,
    has_school_government_recognition: false,
  },
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

export const basicInfoSchemaWrapper = Yup.object().shape<
  Record<keyof { basicInfo: IStudentBasicInfo }, Yup.AnySchema>
>({ basicInfo: basicInfoSchema });

export const addressInfoSchemaWrapper = Yup.object().shape<
  Record<keyof { addressInfo: IStudentAddressInfo }, Yup.AnySchema>
>({ addressInfo: addressInfoSchema });

export const guardianInfoSchemaWrapper = Yup.object().shape<
  Record<keyof { guardianInfo: IStudentGuardianInfo }, Yup.AnySchema>
>({ guardianInfo: guardianSchema });

export const academicInfoSchemaWrapper = Yup.object().shape<
  Record<keyof { academicInfo: Array<IStudentAcademicInfo> }, Yup.AnySchema>
>({ academicInfo: addingAcademicRecordInfoSchema });

export const schemaArray = [
  basicInfoSchemaWrapper,
  addressInfoSchemaWrapper,
  guardianInfoSchemaWrapper,
  null,
  academicInfoSchemaWrapper,
  null,
];

export const generateField = (label: string, value: any) => (
  <div className="min-w-[200px] uppercase">
    <span className="font-semibold "> {label}</span>:{value}
  </div>
);
