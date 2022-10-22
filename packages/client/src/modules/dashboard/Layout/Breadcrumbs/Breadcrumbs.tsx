import React from "react";
import { FiHome } from "react-icons/fi";
import useDashboardRouter from "../../../../hooks/useDashboardRouter";
import useStore from "../../../../store/useStore";
import { joinClass } from "../../../../utils/joinClass";

const Breadcrumbs: React.FC = ({}) => {
  const {
    router: { breadcrumbs, setActiveRoute, setBreadcrumbs },
  } = useStore();
  const { pushRoute } = useDashboardRouter();

  const breadcrumbLinks = breadcrumbs.map(({ title, route }, idx) => (
    <li
      className={joinClass(`gap-2 flex place-content-center uppercase `)}
      key={idx}
      onClick={() => {
        if (idx + 1 !== breadcrumbs.length) {
          setActiveRoute(route ? route : "page404");
          setBreadcrumbs(breadcrumbs.slice(0, idx + 1));
        }
      }}
    >
      <span
        className={joinClass(
          ` my-auto text-xs`,
          idx + 1 !== breadcrumbs.length
            ? `text-blue-600 font-semibold underline cursor-pointer `
            : `font-semibold cursor-default `
        )}
      >
        {title}
      </span>
      {breadcrumbs.length - 1 !== idx && <span className="flex">/</span>}
    </li>
  ));

  return (
    <>
      <div
        className={joinClass(
          `card bg-base-100  border-x-[5px]  divide-l-2 flex gap-2 shadow-lg border-r-white
          border-l-primary py-4 px-6 min-h-[50px] overflow-hidden`
        )}
      >
        <ul className="flex gap-2 ">
          <FiHome
            className=" mt-[1.5px] cursor-pointer"
            onClick={() =>
              pushRoute(
                {
                  title: `Dashboard`,
                  route: "dashboard",
                },
                true
              )
            }
          />
          <li className="flex gap-2 place-items-center ">
            <span>/ </span>
          </li>
          {breadcrumbLinks}
        </ul>
      </div>
    </>
  );
};
export default Breadcrumbs;
