import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import DiceBearAvatar from "../../../../components/DiceBearAvatar";
import LogoutMenu from "./LogoutMenu";

const HeaderMenu: React.FC = ({}) => {
  // const { pushRoute } = useDashboardRouter();

  return (
    <Menu as="div" className="relative inline-block text-left  h-[38px]">
      <Menu.Button className="rounded-full h-[38px] w-[38px] overflow-hidden border-[2px] border-primary-focus">
        <DiceBearAvatar id="20140023" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* <div className="px-1 py-1 "> */}
          {/* {routes
              .filter(({ group }) => group === "menuBar1")
              .map(({ logo: Logo, name, path }, idx) => (
                <MenuItemWrapper
                  key={idx}
                  icon={(props) =>
                    Logo ? <Logo {...props} /> : <FiAirplay {...props} />
                  }
                  title={name}
                  onClick={() =>
                    pushRoute(
                      {
                        title: name,
                        route: path,
                      },
                      true
                    )
                  }
                />
              ))} */}
          {/* </div> */}
          <div className="px-1 py-1 ">
            <LogoutMenu />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeaderMenu;
