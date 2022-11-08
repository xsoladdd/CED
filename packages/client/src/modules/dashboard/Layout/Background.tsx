import Image from "next/image";
import React from "react";
import bg from "../../../assets/svg/bg.svg";

const Background: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen flex absolute -z-10">
        <Image
          src={bg}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="background"
        />
      </div>
    </>
  );
};
export default Background;
