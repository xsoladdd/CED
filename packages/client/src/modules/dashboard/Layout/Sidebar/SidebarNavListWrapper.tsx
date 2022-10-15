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
            ` text-xs text-[.80rem] font-semibold uppercase p-2 text-gray-600`
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
