import React from "react";
import { joinClass } from "../../../../utils/joinClass";

const SidebarNavListWrapper: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <p
          className={joinClass(
            ` text-base text-[.80rem] font-bold uppercase p-2 text-gray-900 text-center pb-[20px]`
          )}
        >
          {title}
        </p>
        <ul className="flex gap-1 flex-col">{children}</ul>
      </div>
    </>
  );
};
export default SidebarNavListWrapper;
