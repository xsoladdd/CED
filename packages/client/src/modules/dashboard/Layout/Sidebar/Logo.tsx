import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <div className="w-full flex place-items-center place-content-center flex-col pt-[50px] pb-[10px]">
        <div className="avatar">
          <div className="w-32 rounded-md">
            <Image
              src={`/dummy/fff.png`}
              height="300px"
              width="300px"
              quality={100}
              alt="background"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Logo;
