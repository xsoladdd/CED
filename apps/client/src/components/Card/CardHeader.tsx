import React from "react";

interface ICardHeaderProps {
  title?: string;
  subTitle?: string;
}

const CardHeader: React.FC<ICardHeaderProps> = ({ title, subTitle }) => {
  return (
    <div>
      <span className="font-semibold uppercase ">{title}</span>
      {subTitle && <span className="text-xs text-gray-500"> - {subTitle}</span>}
    </div>
  );
};
export default CardHeader;
