import React, { useState } from "react";

const StoryWrapper: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <>
      <div
        className="flex flex-col place-items-center place-content-center p-4"
        data-theme={theme}
      >
        <div className="w-fit pb-4">
          <button
            className="btn btn-glass"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Lights on" : "Lights off"}
          </button>
        </div>
        <div className="w-full min-h-[300px]">{children}</div>
      </div>
    </>
  );
};
export default StoryWrapper;
