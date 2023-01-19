import * as yup from "yup";
import { date_stamp_regex } from "../../../utils/regex";

export const addStudentValidationSchema = yup.object().shape({
  LRN: yup.string().min(5).required(),
  first_name: yup.string().min(2).max(20).required(),
  middle_name: yup.string(),
  last_name: yup.string().min(2).max(20).required(),
  contact_number: yup
    .string()

    // .matches(mobile_number_regex)

    .min(11)
    .max(15)
    .required(),
  email: yup.string().email().required(),
  birthday: yup.string().matches(date_stamp_regex),
  requirements: yup.object().required(),
  address: yup.object().required(),
});
export const addStudentsValidationSchema = yup.array(
  yup.object().shape({
    LRN: yup.string().min(5).required(),
    first_name: yup.string().min(2).max(20).required(),
    middle_name: yup.string(),
    last_name: yup.string().min(2).max(20).required(),
    contact_number: yup
      .string()
      // .matches(mobile_number_regex)
      .min(11)
      .max(15)
      .required(),
    email: yup.string().email().required(),
    birthday: yup
      .string()
      .matches(
        date_stamp_regex,
        "Invalid date format, must use yyyy-month-day. iex:2021-11-15"
      ),
  })
);

export const mapUndefined = <T = string>(param: any): T | undefined => {
  return param ? param : undefined;
};

export function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}
