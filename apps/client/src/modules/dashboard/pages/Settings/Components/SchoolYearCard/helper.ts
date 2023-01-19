import * as yup from "yup";

export const schoolyear = yup.object().shape({
  school_year: yup.string(),
});
