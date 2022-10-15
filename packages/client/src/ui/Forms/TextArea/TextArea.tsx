import React from "react";
import { joinClass } from "../../../utils/joinClass";
import { getTextareaColor, getTextareaSize } from "./helper";
import { ITextAreaProps } from "./types";

const TextArea: React.FC<ITextAreaProps> = ({
  className,
  size = "sm",
  color = "ghost",
  isBordered = false,
  isResizable = true,
  ...rest
}) => {
  const sizeClass = getTextareaSize(size);
  const colorClass = getTextareaColor(color);

  return (
    <>
      <textarea
        className={joinClass(
          `textarea `,
          colorClass,
          sizeClass,
          isBordered ? "input-bordered" : "",
          !isResizable ? "resize-none" : "",
          className
        )}
        {...rest}
      />
    </>
  );
};
export default TextArea;
