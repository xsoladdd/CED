import { FormikErrors } from "formik";
import { ChangeEvent } from "react";

export interface IgenerateInput {
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | Date;
  onChange?: (e: ChangeEvent<any>) => void;
  onDateChange?: (date: Date | null) => void;
  error?: string | boolean | FormikErrors<Date> | FormikErrors<any> | undefined;
  touched?: boolean | undefined;
  id: string;
  disabled?: boolean;
  inputType?: "select" | "input" | "date";
  selectValues?: Array<{ value: string | number; text: string; id?: string }>;
  className?: string;
  isHorizontal?: boolean;
}
