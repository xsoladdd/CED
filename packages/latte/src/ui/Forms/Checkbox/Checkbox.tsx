import React from "react";
import { joinClass } from "../../../utils/joinClass";
import { getCheckboxColor, getCheckboxSize } from "./helper";
import { ICheckboxProps } from "./types";

const Checkbox: React.FC<ICheckboxProps> = ({
  color = "accent",
  className,
  label = "",
  size = "sm",
  ...rest
}) => {
  const sizeClass = getCheckboxSize(size);
  const colorClass = getCheckboxColor(color);

  return (
    <>
      <div className="form-control w-fit">
        <label className="label cursor-pointer flex flex-row gap-2">
          <input
            className={joinClass(`checkbox`, sizeClass, colorClass, className)}
            type="checkbox"
            {...rest}
          />
          {label && <span className="label-text">{label}</span>}
        </label>
      </div>
    </>
  );
};
export default Checkbox;
