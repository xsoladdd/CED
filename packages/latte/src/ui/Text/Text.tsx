import React from "react";
import { joinClass } from "../../utils/joinClass";
import { getTextVariantClass } from "./helper";
import { ITextProps } from "./types";

const Text: React.FC<ITextProps> = ({ children, className, variant = `p` }) => {
  const twClass = "block";
  const twVariantClass = getTextVariantClass(variant);
  return (
    <>
      <span className={joinClass(className, twClass, twVariantClass)}>
        {children}
      </span>
    </>
  );
};
export default Text;
