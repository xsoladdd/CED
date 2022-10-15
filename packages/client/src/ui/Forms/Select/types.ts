import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export interface IselectOptionType<T = string | number> {
  value: T;
  text: string;
}

export type ISelectDataArray = Array<IselectOptionType>;

export interface ISelectProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    "size"
  > {
  data?: ISelectDataArray;
  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  isBordered?: boolean;
}
