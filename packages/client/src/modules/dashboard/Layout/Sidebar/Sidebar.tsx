import React from "react";
import { joinClass } from "../../../../utils/joinClass";
import routes from "../../routes";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavListWrapper from "./SidebarNavListWrapper";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="bg-white h-screen pt-[65px]">
        {/* Logo Wrapper */}
        <div className="w-full h-[200px] flex  place-items-center place-content-center">
          <div className="w-[150px] h-[150px] bg-red-300"> Logo goes here</div>
        </div>
        <div
          className={joinClass(
            `bg-white flex flex-col place-items-center gap-3 h-full text-accent-content  w-[250px] `
          )}
        >
          <div className="w-full px-4  flex gap-2 flex-col h-[80vh] overflow-auto">
            <SidebarNavListWrapper title="Menu">
              {routes
                .filter(({ group }) => group === "main")
                .map((data, idx) => (
                  <div key={idx}>
                    <SidebarNavItem {...data} />
                  </div>
                ))}
            </SidebarNavListWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
