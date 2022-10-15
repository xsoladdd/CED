import { IsizeVariantTypes } from "../../helper/vars/types";

export const getTextSize = (size: IsizeVariantTypes | undefined): string => {
  switch (size) {
    case "lg":
      return "text-lg";
    case "sm":
      return "text-sm";
    case "xs":
      return "text-xs";
    default:
      return "text-md";
  }
};
