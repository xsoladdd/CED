import React from "react";
import { DEFAULT_ROUTE } from "../../../helper/global";
import useDashboardRouter from "../../../hooks/useDashboardRouter";
import Text from "../../../components/Text";
import HeaderMenu from "./HeaderMenu";
import useStore from "../../../store/useStore";
const Header: React.FC = ({}) => {
  const { pushRoute } = useDashboardRouter();
  const {
    globalVars: { active_school_year },
  } = useStore();

  return (
    <>
      <div className="shadow-md  absolute w-full top-0 z-20">
        <div className="duration-150 h-[65px]  flex  place-items-center border-t-8 border-t-primary px-8 justify-between bg-white">
          <button
            onClick={() =>
              pushRoute({
                title: DEFAULT_ROUTE.title,
                route: DEFAULT_ROUTE.route ? DEFAULT_ROUTE.route : "page404",
              })
            }
          >
            <Text variant="h4" className="cursor-pointer">
              {/* Logo */}
            </Text>
          </button>
          <div className="flex place-items-center gap-5">
            <span>SY: {active_school_year}</span>
            <HeaderMenu />
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Header);
