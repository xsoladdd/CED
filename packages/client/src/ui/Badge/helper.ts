import { colorVariant, sizeVariant } from "../../helper/vars/constants";
import { IcolorVariantTypes, IsizeVariantTypes } from "../../helper/vars/types";
export const getBadgeSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `badge-xs`;
    case "sm":
      return `badge-sm`;
    case "lg":
      return `badge-lg`;
    default:
      return `badge-md`;
  }
};

export const getBadgeColor = (color: IcolorVariantTypes | "ghost"): string => {
  switch (color) {
    case "accent":
      return "badge-accent";
    case "error":
      return "badge-error";
    case "info":
      return "badge-info";
    case "primary":
      return "badge-primary";
    case "secondary":
      return "badge-secondary";
    case "success":
      return "badge-success";
    case "warning":
      return "badge-warning";
    default:
      return "badge-ghost";
  }
};
