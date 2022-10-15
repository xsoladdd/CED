import { IcolorVariantTypes, IsizeVariantTypes } from "../../helper/vars/types";

export interface IButonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "size" | "type"> {
  onClick?: () => void;
  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  outlined?: boolean;
  type?: "button" | "submit";
  isLoading?: boolean;
  isLink?: boolean;
  isActive?: boolean;
}
