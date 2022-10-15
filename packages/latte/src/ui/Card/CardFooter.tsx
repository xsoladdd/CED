import React from "react";

interface ICardFooterProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const CardFooter: React.FC<ICardFooterProps> = ({ left, right }) => {
  return (
    <>
      {" "}
      <div className=" flex justify-between">
        <div className="">{left}</div>
        <div className="">{right}</div>
      </div>
    </>
  );
};
export default CardFooter;
