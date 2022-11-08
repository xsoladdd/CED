import React from "react";
import routes from "../../routes";
import Logo from "./Logo";
import SidebarNavItem from "./NavItem";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="h-screen py-[10px] pl-[10px] pr-[5px] bg-transparent">
        <div className="bg-base-100 h-full rounded-lg overflow-hidden w-[250px]">
          {/* LOGO */}
          <Logo />
          {/* <div className=""></div> */}

          {/* Nav  */}
          <div className=" flex flex-col gap-[2px] py-4 px-[10px]">
            {routes
              .filter(({ group }) => group === "main")
              .map((data, idx) => (
                <div key={idx}>
                  <SidebarNavItem {...data} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
