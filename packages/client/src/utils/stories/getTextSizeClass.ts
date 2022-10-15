import { IsizeVariantTypes } from '../../helper/vars/types';

export const getTextSizeClass = (
  textSize: IsizeVariantTypes | undefined
): string => {
  switch (textSize) {
    case `lg`:
      return `text-xl`;
    case `md`:
      return `text-base`;
    case `sm`:
      return `text-sm`;
    case `xs`:
      return `text-xs`;
    default:
      return `text-base`;
  }
};
