import {
  ImainColorVariant,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export interface ICheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size"
  > {
  size?: IsizeVariantTypes;
  color?: ImainColorVariant;
  label?: string;
}
