import { mainColorVariant, sizeVariant } from "../../helper/vars/constants";
import { ImainColorVariant, IsizeVariantTypes } from "../../helper/vars/types";
import { toBoolean } from "../../utils/stories/toBoolean";
import { toEnum } from "../../utils/stories/toEnum";

export const switchArgsTypes = {
  status: toBoolean(),
  disabled: toBoolean(),
  size: toEnum(sizeVariant),
  color: toEnum([...mainColorVariant, "normal"]),
};

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
