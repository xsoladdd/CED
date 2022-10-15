import {
  ImainColorVariant,
  IsizeVariantTypes,
} from "../../../helper/vars/types";
export const getCheckboxColor = (
  color: ImainColorVariant | "ghost"
): string => {
  switch (color) {
    case "accent":
      return "checkbox-accent";
    case "primary":
      return "checkbox-primary";
    case "secondary":
      return "checkbox-secondary";
    default:
      return "checkbox-ghost";
  }
};

export const getCheckboxSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case "xs":
      return `checkbox-xs`;
    case "sm":
      return `checkbox-sm`;
    case "lg":
      return `checkbox-lg`;
    default:
      return `checkbox-md`;
  }
};
