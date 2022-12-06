import { useQuery } from "@apollo/client";
import React from "react";
import { GetDashboardCardInfoDocument } from "../../../../graphQL/generated/graphql";

const Dashboard: React.FC = ({}) => {
  const { data: getDashboardCardInfoData, loading } = useQuery(
    GetDashboardCardInfoDocument
  );

  const generateCard = (
    label: string,
    count?: number,
    type?: "primary" | "secondary"
  ) => (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title ">{label}</div>
        {loading && <div className="stat-value">Loading..</div>}
        {type === undefined && !loading && (
          <div className="stat-value">{count}</div>
        )}
        {type === "primary" && !loading && (
          <div className="stat-value text-primary">{count}</div>
        )}
        {type === "secondary" && !loading && (
          <div className="stat-value text-secondary">{count}</div>
        )}
        <div className="stat-desc">Dummy text goes here</div>
      </div>
    </div>
  );
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 ">
        {generateCard(
          "Pre Elementary Students",
          getDashboardCardInfoData?.getDashboardCardInfo?.pre_elem_count
        )}
        {generateCard(
          "Elementary Students",
          getDashboardCardInfoData?.getDashboardCardInfo?.elem_count
        )}
        {generateCard(
          "Enrolled Junior High Students",
          getDashboardCardInfoData?.getDashboardCardInfo?.hs_count
        )}
        {generateCard(
          "Enrolled Senior High Students",
          getDashboardCardInfoData?.getDashboardCardInfo?.shs_count
        )}
        {generateCard(
          "Total Enrolled Student",
          getDashboardCardInfoData?.getDashboardCardInfo?.total_count,
          "primary"
        )}
      </div>
    </>
  );
};
export default Dashboard;
