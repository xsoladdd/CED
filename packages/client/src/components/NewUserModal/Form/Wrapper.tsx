import React from "react";

const Wrapper: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      <div className="h-full px-[50px] pt-[30px]">
        <h2 className="font-semibold text-[32px] leading-none">{title}</h2>
        <p className="text-theme-primary-light-gray dark:text-theme-primary-dark-gray text-[14px] font-light italic py-[3px]">
          {subtitle}
        </p>

        <div className="py-[10px]">{children}</div>
      </div>
    </>
  );
};
export default Wrapper;
