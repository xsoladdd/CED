import React from "react";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { joinClass } from "../../../../utils/joinClass";
import { IRoute } from "../types";

interface SidebarNavItemProps extends Omit<IRoute, "component"> {
  children?: React.ReactChildren;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  logo: Logo,
  path,
  name,
}) => {
  const { pushRoute, breadcrumbs, activeRoute } = useDashboardRouter();

  const isActive = activeRoute === path;

  const activeParentRoute = breadcrumbs[0];
  const activeLink: boolean =
    breadcrumbs.length !== 0 ? activeParentRoute.route === path : isActive;

  const handleClick = () => {
    if (!isActive) {
      pushRoute({ title: name, route: path }, true);
    }
  };

  return (
    <li
      className={joinClass(
        `px-3 py-[3px] flex place-items-center gap-4  duration-150 cursor-pointer w-fit`
      )}
      onClick={handleClick}
    >
      {Logo && (
        <Logo
          className={joinClass(
            " ease-in-out h-5 w-5 ",
            activeLink ? `text-primary-focus` : `text-gray-400`
          )}
        />
      )}
      <span
        className={joinClass(
          "text-sm capitalize",
          activeLink ? `text-primary-focus` : `text-gray-400`
        )}
      >
        {name}
      </span>
    </li>
  );
};
export default SidebarNavItem;
