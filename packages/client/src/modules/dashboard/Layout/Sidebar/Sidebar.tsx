import React from "react";
import { joinClass } from "../../../../utils/joinClass";
import routes from "../../routes";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavListWrapper from "./SidebarNavListWrapper";

const Sidebar: React.FC = () => {
  console.log(routes);
  return (
    <>
      <div className="bg-white h-screen pt-[65px]">
        <div
          className={joinClass(
            `bg-white flex flex-col place-items-center gap-3 h-full text-accent-content  w-[250px] pt-8`
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
