import { IsizeVariantTypes } from "../../helper/vars/types";

export const getLoaderSizeClass = (size: IsizeVariantTypes): string => {
  switch (size) {
    case `xs`:
      return `h-5 w-5xs`;
    case `sm`:
      return `h-7 w-7`;
    case `lg`:
      return `h-12 w-12`;
    default:
      return `h-10 w-10`;
  }
};
