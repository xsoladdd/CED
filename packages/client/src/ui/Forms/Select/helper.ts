import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export const getSelectSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `select-xs`;
    case "sm":
      return `select-sm`;
    case "lg":
      return `select-lg`;
    default:
      return `select-md`;
  }
};

export const getSelectColor = (color: IcolorVariantTypes | "ghost"): string => {
  switch (color) {
    case "accent":
      return "select-accent";
    case "error":
      return "select-error";
    case "info":
      return "select-info";
    case "primary":
      return "select-primary";
    case "secondary":
      return "select-secondary";
    case "success":
      return "select-success";
    case "warning":
      return "select-warning";
    default:
      return "select-ghost";
  }
};
