import React from "react";
import { joinClass } from "../../../utils/joinClass";
import { getInputColor, getInputSize } from "./helper";
import { IInputProps } from "./types";

const Input: React.FC<IInputProps> = ({
  className,
  size = "sm",
  color = "ghost",
  isBordered = true,

  ...rest
}) => {
  const sizeClass = getInputSize(size);
  const colorClass = getInputColor(color);
  const twClass = `input w-full  `;
  return (
    <>
      <input
        className={joinClass(
          className,
          twClass,
          sizeClass,
          isBordered ? "input-bordered" : "",
          colorClass,
          ""
        )}
        {...rest}
      />
    </>
  );
};
export default Input;
