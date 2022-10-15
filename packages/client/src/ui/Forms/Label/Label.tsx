import React from "react";
import { joinClass } from "../../../utils/joinClass";
import { getRequiredClass } from "./helper";
import { ILabelProps } from "./types";

const Label: React.FC<ILabelProps> = ({
  text,
  id,
  className,
  required = false,
  ...rest
}) => {
  const beforeClass = getRequiredClass(required, text);
  return (
    <>
      <label
        className={joinClass(`label-text`, beforeClass, className)}
        htmlFor={id}
        {...rest}
      >
        {text ? text : <React.Fragment>&nbsp;</React.Fragment>}
      </label>
    </>
  );
};
export default Label;
