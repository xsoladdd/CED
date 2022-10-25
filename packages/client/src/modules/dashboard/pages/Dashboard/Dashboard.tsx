import React from "react";

const Dashboard: React.FC = ({}) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Elementary Students</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">Dummy text goes here</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Enrolled Junior High Students</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">Dummy text goes here</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Enrolled Senior High Students</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">Dummy text goes here</div>
          </div>
        </div>

        <div className="stats shadow ">
          <div className="stat">
            <div className="stat-title">Total Enrolled Student</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">Dummy text goes here</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
