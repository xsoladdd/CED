import * as yup from "yup";

export const addSectionSchema = yup.object().shape({
  year_level: yup.string().required("Required"),
  section_name: yup.string().min(2).required("Required"),
});
