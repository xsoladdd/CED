import { IcolorVariantTypes } from '../../helper/vars/types';

export const refactorColorVariant = (
  variant: IcolorVariantTypes | undefined
): string => {
  if (typeof variant === 'undefined') {
    return 'main';
  }
  return variant;
};
