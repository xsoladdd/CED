import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import SignoutArea from "./SignoutArea";
const Header: React.FC = ({}) => {
  return (
    <>
      <div className="bg-base min-w-[200px]  bg-transparent">
        <div className="bg-base-100 rounded-lg w-full flex place-content-end px-[20px] h-[50px]">
          <div className="flex justify-between gap-5 w-full">
            <Breadcrumbs />
            <SignoutArea />
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Header);
