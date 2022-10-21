import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className=" max-h-screen overflow-hidden">
        <div className=" w-full flex flex-col h-screen">
          <Header />
          <div className="h-full flex ">
            <Sidebar />
            <div className=" w-full overflow-hidden bg-gray-200 min-h-full gap-5  h-screen pt-[65px]">
              <div className="px-5 py-4 overflow-y-auto h-full">
                <div className="py-5">
                  <Breadcrumbs />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Layout);
