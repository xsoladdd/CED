import React from "react";
import { joinClass } from "../../../utils/joinClass";

const Wrapper: React.FC<{ scroll?: boolean; className?: string }> = ({
  children,
  scroll,
  className,
}) => {
  return (
    <>
      <div
        className={joinClass(
          `h-full`,
          scroll ? `overflow-auto` : `overflow-hidden`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
export default Wrapper;
