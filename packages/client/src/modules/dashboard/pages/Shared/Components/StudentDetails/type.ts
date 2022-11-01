import { FormikErrors } from "formik";
import { ChangeEvent } from "react";

export interface IgenerateInput {
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange?: (e: ChangeEvent<any>) => void;
  onDateChange?: (date: string | null) => void;
  error?: string | boolean | FormikErrors<Date>;
  touched?: boolean;
  id: string;
  disabled?: boolean;
  inputType?: "select" | "input" | "date";
  selectValues?: Array<{ value: string | number; text: string; id?: string }>;
  className?: string;
}
