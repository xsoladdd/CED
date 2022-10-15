import React from "react";
import { joinClass } from "../../../utils/joinClass";
import { getSelectColor, getSelectSize } from "./helper";
import { ISelectProps } from "./types";

const Select: React.FC<ISelectProps> = ({
  data,
  className,
  size = "sm",
  color = "ghost",
  isBordered = false,
  id,
  ...rest
}) => {
  const sizeClass = getSelectSize(size);
  const colorClass = getSelectColor(color);

  return (
    <>
      <select
        className={joinClass(
          `select w-full max-w-xs`,
          sizeClass,
          colorClass,
          className
        )}
        id={id}
        {...rest}
      >
        {data &&
          data.map(({ text, value }, idx) => (
            <option key={idx} value={value} id={`option-id-${idx}`}>
              {text}
            </option>
          ))}
      </select>
    </>
  );
};
export default Select;
