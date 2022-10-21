import React from 'react';
import { joinClass } from '../../utils/joinClass';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getLoaderSizeClass } from './helper';
import { ILoadingProps } from './types';

const Loading: React.FC<ILoadingProps> = ({ size = `md` }) => {
  const sizeClass = getLoaderSizeClass(size);

  return (
    <AiOutlineLoading3Quarters
      className={joinClass(sizeClass, `animate-spin`)}
    />
  );
};
export default Loading;
