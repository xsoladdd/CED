import { ImainColorVariant, IsizeVariantTypes } from "../../helper/vars/types";

export const getToggleColor = (color: ImainColorVariant | "normal"): string => {
  switch (color) {
    case "accent":
      return "toggle-accent";
    case "primary":
      return "toggle-primary";
    case "secondary":
      return "toggle-secondary";
    default:
      return "toggle-primary";
  }
};

export const getToggleSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `toggle-xs`;
    case "sm":
      return `toggle-sm`;
    case "lg":
      return `toggle-lg`;
    default:
      return `toggle-md`;
  }
};
