import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";
export const getInputSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `input-xs`;
    case "sm":
      return `input-sm`;
    case "lg":
      return `input-lg`;
    default:
      return `input-md`;
  }
};

export const getInputColor = (color: IcolorVariantTypes | "ghost"): string => {
  switch (color) {
    case "accent":
      return "input-accent";
    case "error":
      return "input-error";
    case "info":
      return "input-info";
    case "primary":
      return "input-primary";
    case "secondary":
      return "input-secondary";
    case "success":
      return "input-success";
    case "warning":
      return "input-warning";
    default:
      return "input-ghost";
  }
};
