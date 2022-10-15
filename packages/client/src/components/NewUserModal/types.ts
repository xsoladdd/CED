export interface IStepperData<V, T, E> {
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.ChangeEvent<any>) => void;
  values: V;
  errors: E;
  touched: T;
}

export interface IgenerateField {
  value: any;
  error: any;
  touched: boolean | undefined;
  type?: "input" | "textarea";
  label?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
}
