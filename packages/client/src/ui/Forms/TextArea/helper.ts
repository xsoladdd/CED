import {
  IcolorVariantTypes,
  IsizeVariantTypes,
} from "../../../helper/vars/types";

export const getTextareaSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `textarea-xs`;
    case "sm":
      return `textarea-sm`;
    case "lg":
      return `textarea-lg`;
    default:
      return `textarea-md`;
  }
};

export const getTextareaColor = (
  color: IcolorVariantTypes | "ghost"
): string => {
  switch (color) {
    case "accent":
      return "textarea-accent";
    case "error":
      return "textarea-error";
    case "info":
      return "textarea-info";
    case "primary":
      return "textarea-primary";
    case "secondary":
      return "textarea-secondary";
    case "success":
      return "textarea-success";
    case "warning":
      return "textarea-warning";
    default:
      return "textarea-ghost";
  }
};