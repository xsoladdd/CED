import React from "react";
import { joinClass } from "../../utils/joinClass";
import { getBadgeColor, getBadgeSize } from "./helper";
import { IBadgeProps } from "./types";

const Badge: React.FC<IBadgeProps> = ({
  text,
  children,
  className,
  size = "md",
  color = "error",
}) => {
  const colorClass = getBadgeColor(color);
  const sizeClass = getBadgeSize(size);
  return (
    <>
      <div className="indicator">
        <span
          className={joinClass(
            className,
            `indicator-item badge`,
            sizeClass,
            colorClass
          )}
        >
          {text}
        </span>

        {children}
      </div>
    </>
  );
};
export default Badge;
