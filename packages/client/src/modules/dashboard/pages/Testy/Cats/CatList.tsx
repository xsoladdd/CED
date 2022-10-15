import React from "react";
import { useGetAllCatQuery } from "../../../../../graphql/generated";
import Loading from "../../../../../ui/Loading";

const CatList: React.FC = ({}) => {
  const { data, loading } = useGetAllCatQuery();

  return (
    <>
      <div className="">List of cats</div>
      {loading ? <Loading /> : <div className="">{JSON.stringify(data)}</div>}
    </>
  );
};
export default CatList;
