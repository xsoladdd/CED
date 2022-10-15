import { IsizeVariantTypes } from '../../helper/vars/types';

export const getModalSize = (size: IsizeVariantTypes): string => {
  switch (size) {
    case `sm`:
      return `w-1/4`;
    case `lg`:
      return `w-3/4`;
    default:
      return `w-2/4`;
  }
};
