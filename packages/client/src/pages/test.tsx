import React from "react";

const test: React.FC = ({}) => {
  return (
    <>
      <div className="w-screen h-screen bg-red-50 flex gap-10 p-20">
        <button className="btn btn-lg">Large</button>
        <button className="btn">Normal</button>
        <button className="btn btn-sm">Small</button>
        <button className="btn btn-xs">Tiny</button>
      </div>
    </>
  );
};
export default test;
