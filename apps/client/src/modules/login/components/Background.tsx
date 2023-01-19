import Image from 'next/image';
import React from 'react';

const Background: React.FC = ({}) => {
  return (
    <div className="h-screen w-screen flex absolute -z-10">
      <Image
        src="/login-bg.svg"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="background"
      />
    </div>
  );
};
export default Background;
