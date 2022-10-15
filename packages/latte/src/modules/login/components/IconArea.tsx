import Image from "next/image";
import React from "react";
import Text from "../../../ui/Text";

const IconArea: React.FC = ({}) => {
  return (
    <>
      <div className=" w-1/2  ">
        <div className="px-8 py-10 flex flex-col place-items-center gap-2">
          <Text variant="h5" className="text-primary-focus w-full">
            Project Locale
          </Text>
          {/* <h1 className="font-semibold text-primary-focus ">Project Locale</h1> */}
          <div className="overflow-hidden w-[300px]">
            <Image
              src="/login-illu.svg"
              width={50}
              height={50}
              layout="responsive"
              alt="Login Illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default IconArea;
