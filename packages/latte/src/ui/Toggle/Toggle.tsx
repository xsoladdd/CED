import React from "react";
import { joinClass } from "../../utils/joinClass";
import { getToggleColor, getToggleSize } from "./helper";
import { IToggleProps } from "./types";

const Toggle: React.FC<IToggleProps> = ({
  status,
  onClick,
  color = `normal`,
  className,
  disabled = false,
  size = `md`,
  label,
}) => {
  const colorClass = getToggleColor(color);
  const sizeClass = getToggleSize(size);

  return (
    <>
      <div className="form-control w-fit">
        <label className="label cursor-pointer flex gap-2">
          {label && <span className="label-text">{label}</span>}
          <input
            type="checkbox"
            checked={status}
            onClick={onClick}
            className={joinClass(className, `toggle`, colorClass, sizeClass)}
            disabled={disabled}
          />
        </label>
      </div>
    </>
  );
};
export default Toggle;
