import React from "react";
import Loading from "../../../ui/Loading";

const PageLoading: React.FC = ({}) => {
  return (
    <div className="flex place-items-center place-content-center w-full h-full ">
      <Loading size="md" />
    </div>
  );
};
export default PageLoading;
