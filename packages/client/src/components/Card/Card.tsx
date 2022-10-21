import { Disclosure } from "@headlessui/react";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { joinClass } from "../../utils/joinClass";

interface ICardProps {
  className?: string;
  bordered?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  toggle?: boolean;
  toggleStatus?: boolean;
}

const Card: React.FC<ICardProps> = ({
  children,
  className,
  footer,
  toggle = false,
  toggleStatus = true,
  header,
  bordered = true,
}) => {
  return (
    <div
      className={joinClass(
        `card bg-base-100 border-x-[5px] selection:divide-l-2 flex gap-2 shadow-lg border-r-white py-4 min-h-fit`,
        bordered ? `border-l-primary` : `border-l-transparent`,
        className
      )}
    >
      <Disclosure defaultOpen={toggleStatus}>
        {({ open }: { open: boolean }) => (
          <>
            <div className={joinClass(`px-6 flex justify-between`)}>
              <div className="">{header}</div>
              <div className="flex place-items-center">
                {toggle && (
                  <>
                    <Disclosure.Button>
                      <FiChevronDown
                        size={"25"}
                        className={joinClass(
                          open ? "rotate-180 transform" : ""
                        )}
                      />
                    </Disclosure.Button>
                  </>
                )}
              </div>
            </div>
            <Disclosure.Panel>
              <div className=" px-6 py-4 min-h-[50px]">{children}</div>

              <div className=" px-6 pt-2 w-full">{footer}</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default Card;
