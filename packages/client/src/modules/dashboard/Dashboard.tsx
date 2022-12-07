import { NextPage } from "next";
import React, { Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import useDashboardRouter from "../../hooks/useDashboardRouter";
import useStore from "../../store/useStore";
import DashboardLayout from "./Layout";
import PageLoading from "./Layout/PageLoading";
import generateRoutes from "./routes";
import useDashboard from "./useDashboard";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  const { loading } = useAuth();
  const { activeRoute } = useDashboardRouter();
  const { loading: useDashboardLoading } = useDashboard();

  const {
    user: {
      data: { role },
    },
  } = useStore();

  const routes = generateRoutes(role);

  return loading || useDashboardLoading ? (
    <div className="h-screen w-screen">
      <PageLoading />
    </div>
  ) : (
    <DashboardLayout>
      <Suspense fallback={<PageLoading />}>
        {routes.map(
          ({ component: Component, path }, idx) =>
            path === activeRoute && <Component key={idx} />
        )}
      </Suspense>
    </DashboardLayout>
  );
};
export default Dashboard;
