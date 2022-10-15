import { NextPage } from "next";
import React, { Suspense } from "react";
import DashboardLayout from "./Layout";
import PageLoading from "./Layout/PageLoading";
import useAxios from "../../hooks/useAxios";
import useStore from "../../store/useStore";
import routes from "./routes";
import useDashboardRouter from "../../hooks/useDashboardRouter";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  const { loading: profileLoading, response: profileResponse } =
    useAxios(`store-user/profile`);

  const { activeRoute } = useDashboardRouter();

  const {
    user: { setData },
  } = useStore();

  React.useEffect(() => {
    const res = profileResponse as IAuthServerRes<{
      user: IUserData;
    }>;
    if (res.status && res.status === 1 && res.data.user) setData(res.data.user);
  }, [profileResponse]);

  return profileLoading ? (
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
