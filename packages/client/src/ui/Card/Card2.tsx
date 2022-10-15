import React from "react";
import { joinClass } from "../../utils/joinClass";

interface ICardProps {
  className?: string;
  bordered?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  className,
  bordered = true,
}) => {
  return (
    <div
      className={joinClass(
        `card bg-base-100   border-x-[5px]  divide-l-2 flex gap-2 shadow-lg border-r-white`,
        bordered ? `border-l-primary` : `border-l-transparent`,
        className
      )}
    >
      {children}
    </div>
  );
};
export default Card;
