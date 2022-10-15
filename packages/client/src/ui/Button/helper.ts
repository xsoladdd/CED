import { IcolorVariantTypes, IsizeVariantTypes } from "../../helper/vars/types";

export const getButtonColor = (color: IcolorVariantTypes | "ghost"): string => {
  switch (color) {
    case "accent":
      return "btn-accent";
    case "error":
      return "btn-error";
    case "info":
      return "btn-info";
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "success":
      return "btn-success";
    case "warning":
      return "btn-warning";
    default:
      return "btn-ghost";
  }
};

export const getButtonSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `btn-xs`;
    case "sm":
      return `btn-sm`;
    case "lg":
      return `btn-lg`;
    default:
      return `btn-md`;
  }
};
