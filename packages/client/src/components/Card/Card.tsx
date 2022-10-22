import React from "react";
import { joinClass } from "../../utils/joinClass";

interface ICardProps {
  className?: string;
  bordered?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  toggle?: boolean;
  toggleStatus?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  className,
  footer,
  header,
  bordered = true,
}) => {
  return (
    <div
      className={joinClass(
        `card bg-base-100 border-x-[5px] selection:divide-l-2 flex gap-2 shadow-lg border-r-white py-4 min-h-fit`,
        bordered ? `border-l-primary` : `border-l-transparent`,
        className
      )}
    >
      <div className={joinClass(`px-6 flex justify-between`)}>{header}</div>
      <div className=" px-6 py-4 min-h-[50px]">{children}</div>

      <div className=" px-6 pt-2 w-full">{footer}</div>
    </div>
  );
};
export default Card;
