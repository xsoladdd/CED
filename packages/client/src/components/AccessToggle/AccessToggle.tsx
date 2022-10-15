import React from "react";

const AccessToggle: React.FC<{ access: boolean }> = ({ access, children }) => {
  return <>{access && children}</>;
};
export default AccessToggle;
