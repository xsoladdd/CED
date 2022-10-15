import React from "react";
import { joinClass } from "../../utils/joinClass";
import { getButtonColor, getButtonSize } from "./helper";
import { IButonProps } from "./types";
const Button: React.FC<IButonProps> = ({
  children,
  className,
  onClick,
  color = "primary",
  size = "md",
  isLink = false,
  outlined = false,
  disabled,
  type = `button`,
  isLoading = false,
  isActive = false,
  ...rest
}) => {
  const colorClass = getButtonColor(color);
  const sizeClass = getButtonSize(size);

  return (
    <button
      className={joinClass(
        className,
        `btn`,
        colorClass,
        sizeClass,
        outlined ? "btn-outline" : "",
        isLink ? "btn-link" : "",
        isLoading ? "loading" : "",
        isActive ? "btn-active" : ""
      )}
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
