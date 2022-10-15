import { useRouter } from "next/router";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import MenuItemWrapper from "./MenuItemWrapper";

const LogoutMenu: React.FC = ({}) => {
  const { push } = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    push("/");
  };

  return (
    <MenuItemWrapper
      icon={(props) => <FiLogOut {...props} />}
      title="Log out"
      onClick={handleLogOut}
    />
  );
};

export default LogoutMenu;
