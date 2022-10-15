import { ImainColorVariant, IsizeVariantTypes } from "../../helper/vars/types";

export interface IToggleProps {
  status?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  color?: ImainColorVariant | "normal";
  size?: IsizeVariantTypes;
  label?: string;
}
