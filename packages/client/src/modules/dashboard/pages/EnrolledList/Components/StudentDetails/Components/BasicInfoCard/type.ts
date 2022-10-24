import { ChangeEvent } from "react";

export interface IgenerateInput {
  label: string;
  required?: boolean;
  placeholer?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  error?: string;
  touched?: boolean;
  id: string;
  disabled: boolean;
  inputType?: "select" | "input";
  selectValues?: Array<{ value: string | number; text: string; id?: string }>;
  className?: string;
}
