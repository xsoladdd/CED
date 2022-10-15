import React from "react";
import AccessToggle from "../../../../components/AccessToggle";
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
            <SidebarNavListWrapper title="admin">
              {routes
                .filter(({ group }) => group === "admin")
                .map((data, idx) => (
                  <AccessToggle access={true} key={idx}>
                    <SidebarNavItem {...data} />
                  </AccessToggle>
                ))}
            </SidebarNavListWrapper>
            <SidebarNavListWrapper title="store">
              {routes
                .filter(({ group }) => group === "store")
                .map((data, idx) => (
                  <AccessToggle access={true} key={idx}>
                    <SidebarNavItem {...data} />
                  </AccessToggle>
                ))}
            </SidebarNavListWrapper>
            <SidebarNavListWrapper title="website">
              {routes
                .filter(({ group }) => group === "website")
                .map((data, idx) => (
                  <AccessToggle access={true} key={idx}>
                    <SidebarNavItem {...data} />
                  </AccessToggle>
                ))}
            </SidebarNavListWrapper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
