import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { joinClass } from "../../utils/joinClass";
import Text from "../../components/Text";
import { getModalSize } from "./helper";
import { IModalProps } from "./types";

const Modal: React.FC<IModalProps> = ({
  title,
  children,
  status = false,
  size = `md`,
  handleClose,
  footer,
}) => {
  const sizeClass = getModalSize(size);

  return (
    <Transition appear show={status} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        id="closeButton"
        onClose={() => handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={joinClass(`modal-box bg-base-100`, sizeClass)}
              >
                {/* Header */}
                <Dialog.Title>
                  <div className=" flex justify-between place-items-center  ">
                    <Text variant="h5" className="uppercase ">
                      {title}
                    </Text>
                  </div>
                </Dialog.Title>
                {/* Body */}
                <div className="py-4">{children}</div>
                {/* Footer */}
                {footer && footer}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
