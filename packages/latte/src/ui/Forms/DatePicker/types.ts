import { CalendarProps } from "react-date-range";
import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";
import { IInputProps } from "../Input/types";

export interface IDatePickerProps
  extends Omit<IInputProps, "defaultValue">,
    Omit<CalendarProps, "onChange" | "color"> {
  dateFormat?: string;
  defaultValue?: Date;
  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  isBordered?: boolean;
}
