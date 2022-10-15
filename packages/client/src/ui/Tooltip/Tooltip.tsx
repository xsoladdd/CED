import React, { ReactNode } from "react";
import { joinClass } from "../../utils/joinClass";

interface ITooltipProps {
  text?: ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
}

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  text,
  direction = "left",
}) => {
  let twDirectionClass = "";

  switch (direction) {
    case "bottom":
      twDirectionClass = "tooltip-bottom";
      break;
    case "top":
      twDirectionClass = "tooltip-top";
      break;
    case "right":
      twDirectionClass = "tooltip-right";
      break;
    default:
      twDirectionClass = "tooltip-left";
      break;
  }

  return (
    <>
      <div className={joinClass(`tooltip `, twDirectionClass)} data-tip={text}>
        {children}
      </div>
    </>
  );
};
export default Tooltip;
