import React from "react";
import { FiArrowRight } from "react-icons/fi";
import useStore from "../../../../store/useStore";
import { joinClass } from "../../../../utils/joinClass";

const Breadcrumbs: React.FC = ({}) => {
  const {
    router: { breadcrumbs, setActiveRoute, setBreadcrumbs },
  } = useStore();

  const breadcrumbLinks = breadcrumbs.map(({ title, route }, idx) => (
    <li
      className={joinClass(`gap-2 flex place-content-center uppercase`)}
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
          ` my-auto`,
          idx + 1 !== breadcrumbs.length
            ? `text-blue-500 font-semibold underline cursor-pointer text-xs`
            : `font-semibold cursor-default text-[16px]`
        )}
      >
        {title}
      </span>
      {breadcrumbs.length - 1 !== idx && (
        <span className="flex">
          <FiArrowRight className="inline-block my-auto" size="15" />{" "}
        </span>
      )}
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
          {/* <li className="flex gap-2 ">
            <FiHome />
            <span>/ </span>
          </li> */}
          {breadcrumbLinks}
        </ul>
      </div>
    </>
  );
};
export default Breadcrumbs;
