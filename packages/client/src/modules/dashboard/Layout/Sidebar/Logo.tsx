import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <>
      <div className="w-full flex place-items-center place-content-center flex-col pt-[50px] pb-[10px] ">
        <div className="avatar">
          <div className="w-[80px] h-[80px] rounded-md ">
            <div
            // className=" my-[50px]"
            >
              <Image
                src={`/system-logo.svg`}
                loading="lazy"
                layout="fill"
                // width={"30px"}
                // className=""
                alt="System Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Logo;
