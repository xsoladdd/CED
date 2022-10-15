import Image from "next/image";
import React from "react";

interface ILogoProps {
  src: string;
}

const Logo: React.FC<ILogoProps> = ({ src }) => {
  return (
    <>
      <Image src={src} width={30} height={30} alt="Logo" />
    </>
  );
};
export default Logo;
