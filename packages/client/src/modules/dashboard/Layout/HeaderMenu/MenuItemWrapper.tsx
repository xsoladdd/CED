import { Menu } from "@headlessui/react";
import React from "react";
import { IconType } from "react-icons";
import { joinClass } from "../../../../utils/joinClass";

interface IMenuItemWrapperProps {
  icon: IconType;
  title: string;
  onClick?: () => void;
}

const MenuItemWrapper: React.FC<IMenuItemWrapperProps> = ({
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <>
      <Menu.Item>
        {({ active }: { active: boolean }) => (
          <button
            className={joinClass(
              active ? "bg-primary text-primary-content " : "text-primary",
              ` group flex w-full items-center rounded-md px-3 py-2 text-sm gap-3`
            )}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
            <span
              className={joinClass(
                active ? "bg-primary text-white" : "text-black"
              )}
            >
              {" "}
              {title}
            </span>
          </button>
        )}
      </Menu.Item>
    </>
  );
};
export default MenuItemWrapper;
