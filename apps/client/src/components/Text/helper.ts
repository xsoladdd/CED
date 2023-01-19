import { Mutable } from "../../helper/vars/types";
import { TtextVariant } from "./types";

export const textVariantRO = [
  `p`,
  `h1`,
  `h2`,
  `h3`,
  `h4`,
  `h5`,
  `h6`,
  `h7`,
  `error`,
] as const;
export const textVariant = textVariantRO as Mutable<typeof textVariantRO>;

export const getTextVariantClass = (variant: TtextVariant): string => {
  const twHeadingClass = "font-semibold text-base-content";
  switch (variant) {
    case "h1":
      return `${twHeadingClass} text-4xl `;
    case "h2":
      return `${twHeadingClass} text-3xl `;
    case "h3":
      return `${twHeadingClass} text-2xl `;
    case "h4":
      return `${twHeadingClass} text-xl `;
    case "h5":
      return `${twHeadingClass} text-lg `;
    case "h6":
      return `${twHeadingClass} text-base `;
    case "h7":
      return `${twHeadingClass} text-sm `;
    case "error":
      return `text-error text-xs italic font-light`;
    default:
      return `text-base-content text-md font-light`;
  }
};
