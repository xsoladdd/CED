import { format } from "date-fns";

export const formatDateReadable = (date: Date | string): string => {
  const dateFormat = "MMMM dd yyyy";

  console.log(`formatDateReadable`, typeof date, date);
  if (typeof date === "string") {
    const conv = new Date(date);
    return format(conv, dateFormat);
  } else {
    return format(date, dateFormat);
  }
};
