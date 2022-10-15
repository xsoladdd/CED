import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import React, { Fragment, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { joinClass } from "../../../utils/joinClass";
import Input from "../Input/Input";
import { IDatePickerProps } from "./types";

const DatePicker: React.FC<IDatePickerProps> = ({
  dateFormat = `MMMM dd yyyy`,
  defaultValue,
  className,
  id,
  ...rest
}) => {
  const [date, setDate] = useState<Date | undefined>(defaultValue);
  const [calendarStatus, setCalendarStatus] = useState(false);

  const handleClose = () => {
    setCalendarStatus(false);
  };

  return (
    <>
      <div className="relative">
        <Input
          value={date && format(date, dateFormat)}
          // placeholder={placeholder}
          readOnly
          onClick={() => setCalendarStatus(!calendarStatus)}
          className={joinClass(`cursor-pointer`, className)}
          {...rest}
        />

        <Transition show={calendarStatus} as={Fragment}>
          <Dialog onClose={handleClose}>
            <div className="">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" bg-white flex mt-1 w-[340px] place-content-center transform overflow-hidden border-[1px] rounded-md border-theme-primary-light-complimentary text-left align-middle shadow-xl transition-all">
                  <Calendar
                    onChange={(e) => {
                      setDate(e);
                      handleClose();
                    }}
                    date={date}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};
export default DatePicker;
