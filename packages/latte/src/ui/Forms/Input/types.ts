import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export interface IInputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "size"
  > {
  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  isBordered?: boolean;
}
