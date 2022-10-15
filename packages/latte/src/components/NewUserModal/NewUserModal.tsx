import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import useStore from "../../store/useStore";
import NewUserStepperForm from "./Form/NewUserStepperForm";

const NewUserModal: React.FC = ({}) => {
  const {
    user: { isNewUser },
  } = useStore();
  return (
    <>
      <Transition appear show={isNewUser} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => ({})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center  p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[800px] h-[500px] transform overflow-hidden  rounded-[15px] bg-base-300 text-left  shadow-xl transition-all">
                  <NewUserStepperForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default NewUserModal;
