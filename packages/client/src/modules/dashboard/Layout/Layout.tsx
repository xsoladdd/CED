import React from "react";
import Background from "./Background";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Background />
      <div className=" max-h-screen overflow-hidden">
        <div className=" w-full flex h-screen bg-transparent">
          <Sidebar />
          <div className="w-full gap-[10px] flex flex-col pl-[5px] pr-[10px] py-[10px]">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Layout);
