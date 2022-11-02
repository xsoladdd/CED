import { format } from "date-fns";

export const formatDateReadable = (date: Date | string): string => {
  const dateFormat = "MMMM dd yyyy";

  if (typeof date === "string") {
    const conv = new Date(date);
    return format(conv, dateFormat);
  } else {
    return format(date, dateFormat);
  }
};
