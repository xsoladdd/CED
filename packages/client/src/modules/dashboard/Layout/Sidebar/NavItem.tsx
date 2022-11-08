import React from "react";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import { joinClass } from "../../../../utils/joinClass";
import { INavItemProps } from "./types";

const NavItem: React.FC<INavItemProps> = ({ logo: Logo, path, name }) => {
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
        `h-[40px] px-[20px] rounded-md overflow-hidden flex place-items-center gap-4 cursor-pointer hover:bg-base-200 `,
        activeLink ? "bg-base-200" : ""
      )}
      onClick={handleClick}
    >
      {Logo && (
        <Logo
          className={joinClass(
            " ease-in-out h-5 w-5 ",
            activeLink ? `text-primary-focus` : `text-base-content`
          )}
        />
      )}
      <span
        className={joinClass(
          "text-sm capitalize",
          activeLink ? `text-primary-focus` : `text-base-content`
        )}
      >
        {name}
      </span>
    </li>
  );
};
export default NavItem;
