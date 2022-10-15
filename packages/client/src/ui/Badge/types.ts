import { IcolorVariantTypes, IsizeVariantTypes } from "../../helper/vars/types";

export interface IBadgeProps {
  text?: string;

  color?: IcolorVariantTypes | "ghost";
  size?: IsizeVariantTypes;
  className?: string;
}
