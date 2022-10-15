import * as yup from "yup";
import { maxError, minError } from "../../utils/yup/generateError";

export const initialValue = {
  name: "",
  description: "",
  firstName: "",
  middleName: "",
  lastName: "",
  mobileNumber: "",
  landlineNumber: "",
  address: "",
  eula: false,
};

export const schemaArray = [
  null,
  yup.object({
    name: yup
      .string()
      .min(2, minError(2))
      .max(20, maxError(20))
      .required("Field is required"),
    description: yup.string(),
  }),
  yup.object({
    firstName: yup
      .string()
      .min(5, minError(5))
      .max(15, maxError(15))
      .required("First name is required"),
    middleName: yup
      .string()
      .min(1, minError(1))
      .max(10, maxError(10))
      .required("Middle name is required"),
    lastName: yup
      .string()
      .min(2, minError(2))
      .max(10, maxError(10))
      .required("Last name is required"),
    mobileNumber: yup
      .string() // regexr.com/6anqd
      .matches(/^(09|\+639)\d{9}$/, {
        message: "Invalid mobile number",
        excludeEmptyString: false,
      })
      .min(11, minError(11))
      .max(13, maxError(13))
      .required(`Contact number is required`),
    address: yup
      .string()
      .min(10, minError(10))
      .required(`Address number is required`),
  }),
  null,
  yup.object({
    eula: yup
      .boolean()
      .oneOf([true], "You must accept the terms and condition"),
  }),
];
